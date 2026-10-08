import type { Article } from './types'

export const chunkedBulkRoleAssignment: Article = {
  slug: 'chunked-bulk-role-assignment',
  title: 'Bulk Role Assignment: Why Chunks of 500, Not One Big Insert',
  description:
    'Synchronous bulk assignment timed out above 500 users and could not say which users had succeeded. The fix was to make the work resumable.',
  category: 'Backend Engineering',
  tags: ['Kafka', 'Batch processing', 'Reliability', 'Observability'],
  date: '2026-10-09',
  source: 'From my work on the Access Portal, an enterprise identity governance platform at Intimec via MicroTechX.',
  ogLines: ['Bulk assignment', 'Chunks of 500, resumable'],
  blocks: [
    { type: 'h2', text: 'The problem' },
    {
      type: 'p',
      text: 'Bulk role assignment ran synchronously and started timing out above 500 users. Worse than the timeout, there was no visibility into which users had succeeded and which had failed. A failure left you guessing.',
    },

    { type: 'h2', text: 'Constraints' },
    {
      type: 'ul',
      items: [
        'Operations needed to reach 5,000+ users.',
        'A partial failure must be recoverable without redoing or losing work.',
        'Administrators need to see progress while the operation runs.',
      ],
    },

    { type: 'h2', text: 'Options' },
    {
      type: 'table',
      head: ['Option', 'What works', 'What breaks'],
      rows: [
        [
          'Single bulk INSERT',
          'Fast',
          'No progress tracking and no partial failure recovery. If it fails at row 4,000 of 5,000, you do not know what succeeded.',
        ],
        [
          'One transaction per record',
          'Full visibility and recoverability',
          'Slow, because it means thousands of individual round trips.',
        ],
        [
          'Chunked async processing',
          'Batches of records with tracked progress',
          'More moving parts: a job table and chunk coordination.',
        ],
      ],
    },
    {
      type: 'p',
      text: 'I tested chunk sizes of 100, 500 and 1000 records, and consumer counts of 1, 3 and 5, before settling on a configuration. The numbers matter less than the method: pick the knob, measure, then decide.',
    },

    { type: 'h2', text: 'How it works' },
    {
      type: 'diagram',
      title: 'A 5,000-user operation becomes ten recoverable chunks',
      rows: [
        {
          label: 'Submit',
          nodes: [
            { label: 'Admin request', sub: '5,000 users' },
            { label: 'Batch Job row', sub: 'progress tracked', state: 'highlight', via: 'create' },
            { label: 'Kafka', via: 'publish' },
            { label: 'Worker', sub: '500 records per chunk', via: 'consume' },
          ],
        },
        {
          label: 'Worker crashes after chunk 6',
          nodes: [
            { label: 'Batch Job row', sub: 'last completed: chunk 6', state: 'highlight' },
            { label: 'Worker restarts', sub: 'resumes at chunk 7', via: 'reads progress' },
          ],
        },
      ],
    },
    {
      type: 'p',
      text: 'The Batch Job table is the source of truth for progress. Each chunk updates it on completion, so the UI can show real-time progress and a restart knows exactly where to pick up.',
    },

    { type: 'h2', text: 'Decision' },
    {
      type: 'callout',
      tone: 'decision',
      title: 'Decision',
      text: 'Chunked async processing at 500 records per chunk, run by a Kafka worker, with a Batch Job table tracking progress.',
    },
    {
      type: 'callout',
      tone: 'tradeoff',
      title: 'Trade-off accepted',
      text: 'More implementation complexity (a job tracking table and chunk coordination) than a single bulk insert, in exchange for observability and recoverability.',
    },
    {
      type: 'callout',
      tone: 'failure',
      title: 'Failure scenario handled',
      text: 'If the worker crashes mid-batch, the Batch Job table records the last completed chunk. Processing resumes from there instead of starting over or losing track of partial progress.',
    },

    { type: 'h2', text: 'Result' },
    {
      type: 'metrics',
      items: [
        {
          label: 'Users per bulk operation',
          before: 'Timed out above 500',
          after: '5,000+ with real-time progress and partial failure recovery',
        },
      ],
    },

    { type: 'h2', text: 'What I would change today' },
    {
      type: 'p',
      text: 'Resuming from the last completed chunk assumes a chunk can be safely run twice, because a crash can land in the middle of one. I would make each chunk idempotent, so reprocessing a partly applied chunk cannot assign the same role twice.',
    },
  ],
}
