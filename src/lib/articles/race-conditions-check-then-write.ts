import type { Article } from './types'

export const raceConditionsCheckThenWrite: Article = {
  slug: 'race-conditions-check-then-write',
  title: 'Race Conditions: The Check-Then-Write Bug That Duplicated Notifications',
  description:
    'Two concurrent requests both passed an existence check before either one wrote. The fix was a transaction boundary and a unique constraint, not smarter logic.',
  category: 'Concurrency',
  tags: ['Concurrency', 'Transactions', 'Data integrity'],
  date: '2026-10-09',
  source:
    'From my work at Digital Upgraders on Cunocovo, a live social platform for photographers and creative professionals.',
  cover: '/articles/race-conditions.png',
  ogLines: ['Race Conditions', 'Check, then write'],
  featured: true,
  blocks: [
    { type: 'h2', text: 'The problem' },
    {
      type: 'p',
      text: 'Users on Cunocovo were receiving the same notification more than once. Not every time. The bug showed up intermittently and only under concurrent load, which is the signature of a boundary problem and rarely the signature of a logic problem.',
    },
    {
      type: 'p',
      text: 'Reading the code top to bottom made it look correct, and that is exactly why it was hard to find. Each step was right. The sequence was not.',
    },

    { type: 'h2', text: 'What was actually happening' },
    {
      type: 'p',
      text: 'The notification path did two things: check whether the notification already existed, and create it if it did not. Two concurrent requests for the same event both ran the check before either one wrote. Both saw nothing. Both created.',
    },
    {
      type: 'diagram',
      title: 'Two requests, one event',
      caption: 'Both checks complete before either write. Neither request did anything wrong in isolation.',
      rows: [
        {
          label: 'Request A',
          nodes: [
            { label: 'Check', sub: 'not found' },
            { label: 'Create', sub: 'notification' },
          ],
        },
        {
          label: 'Request B',
          nodes: [
            { label: 'Check', sub: 'not found' },
            { label: 'Create', sub: 'notification' },
          ],
        },
        {
          label: 'Result',
          nodes: [{ label: 'Two notifications for one event', state: 'fail' }],
        },
      ],
    },

    { type: 'h2', text: 'What does and does not close the gap' },
    {
      type: 'p',
      text: 'The instinct is to make the check smarter. That does not help, because the gap is between the check and the write, not inside the check.',
    },
    {
      type: 'table',
      head: ['Approach', 'What it does', 'Why it is not enough alone'],
      rows: [
        ['A more careful check', 'Looks for the row more thoroughly', 'The gap between check and write is still open.'],
        [
          'A transaction around check and create',
          'Makes the two steps one unit of work',
          'Under common default isolation levels, two transactions can both read "no row" and both insert.',
        ],
        [
          'A unique constraint alone',
          'The database rejects the second insert',
          'The rejection becomes an unhandled error unless the code expects it.',
        ],
        [
          'Transaction plus unique constraint',
          'Atomic unit of work, with the invariant enforced by the schema',
          'This is the combination I used.',
        ],
      ],
    },
    {
      type: 'p',
      text: 'The guarantee belongs in the schema. Application code can be bypassed by a new code path, a retry, or a second service. A unique constraint cannot.',
    },
    {
      type: 'code',
      lang: 'sql',
      title: 'Illustrative sketch (table and column names are examples)',
      code: `-- The invariant lives in the schema, where nothing can skip it
ALTER TABLE notifications
  ADD CONSTRAINT uq_notification_event_recipient
  UNIQUE (event_id, recipient_id);`,
    },
    {
      type: 'code',
      lang: 'text',
      title: 'Shape of the fixed flow',
      code: `begin transaction
  insert notification (event_id, recipient_id)
  if unique violation -> treat as "already exists" and do nothing
commit`,
    },

    { type: 'h2', text: 'Decision' },
    {
      type: 'callout',
      tone: 'decision',
      title: 'Decision',
      text: 'Wrap the check-and-create in a database transaction, with a unique constraint as the second line of defence.',
    },
    {
      type: 'callout',
      tone: 'tradeoff',
      title: 'What it costs',
      text: 'The loser of the race now hits an error path. That path has to be handled deliberately as "already exists", not logged as a failure and not retried blindly.',
    },

    { type: 'h2', text: 'Result' },
    {
      type: 'metrics',
      items: [
        {
          label: 'Duplicate notification incidents',
          before: 'Intermittent under load',
          after: '0 after the fix',
        },
      ],
    },

    { type: 'h2', text: 'What I took from it' },
    {
      type: 'ul',
      items: [
        'Intermittent bugs under concurrency are almost always a transaction boundary problem, not a logic problem.',
        'Put the invariant where it cannot be bypassed. If two rows must never coexist, say so in the schema.',
        'Repeating a request many times does not reproduce a race. Releasing two requests at the same instant does.',
      ],
    },

    { type: 'h2', text: 'What I would change today' },
    {
      type: 'p',
      text: 'I would add an automated test that releases two requests for the same event at the same moment and asserts exactly one notification exists. That makes the guarantee something the test suite checks, not something I only reasoned about.',
    },
  ],
}
