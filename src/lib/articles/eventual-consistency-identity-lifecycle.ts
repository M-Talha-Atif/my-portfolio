import type { Article } from './types'

export const eventualConsistencyIdentityLifecycle: Article = {
  slug: 'eventual-consistency-identity-lifecycle',
  title: 'Eventual Consistency: Splitting Identity Calls Between gRPC and Kafka',
  description:
    'A login cannot wait for an async consumer, and lifecycle changes should not depend on Auth being up. One service boundary needed two communication styles.',
  category: 'Distributed Systems',
  tags: ['gRPC', 'Kafka', 'Eventual consistency', 'Microservices'],
  date: '2026-10-09',
  source: 'From my work on the Access Portal, an enterprise identity governance platform at Intimec via MicroTechX.',
  cover: '/articles/eventual-consistency.png',
  ogLines: ['Eventual Consistency', 'gRPC and Kafka, split'],
  featured: true,
  blocks: [
    { type: 'h2', text: 'The problem' },
    {
      type: 'p',
      text: 'The Auth Service needed fast identity and manager resolution on every login. The Identity Service also needed to broadcast lifecycle changes (creation, updates, deletion) to other services. Same two services, two very different needs.',
    },

    { type: 'h2', text: 'Constraints' },
    {
      type: 'ul',
      items: [
        'Login is synchronous. The caller needs an answer now, so the lookup cannot wait for a consumer to catch up.',
        'Lifecycle changes must reach other services even when one of them is down.',
        'Login volume is high, so per-call overhead compounds.',
      ],
    },

    { type: 'h2', text: 'Options' },
    {
      type: 'table',
      head: ['Option', 'What works', 'What breaks'],
      rows: [
        [
          'REST for everything',
          'Simplest to build and debug',
          'JSON serialization and HTTP header overhead on every login, compounding at high volume.',
        ],
        [
          'Kafka for everything',
          'Durable and decoupled',
          'Async by nature. A login cannot wait for an async consumer to answer it.',
        ],
        [
          'gRPC for sync, Kafka for async',
          'Each path uses the style that matches its requirement',
          'Two communication patterns to maintain.',
        ],
      ],
    },
    {
      type: 'diagram',
      title: 'Same boundary, two paths',
      rows: [
        {
          label: 'Login path (synchronous)',
          nodes: [
            { label: 'Client' },
            { label: 'Auth Service', via: 'request' },
            { label: 'Identity Service', sub: 'identity + manager lookup', state: 'highlight', via: 'gRPC + Protobuf' },
          ],
        },
        {
          label: 'Lifecycle path (asynchronous)',
          nodes: [
            { label: 'Identity Service', sub: 'create / update / delete' },
            { label: 'Kafka', state: 'highlight', via: 'event' },
            { label: 'Auth Service and other consumers', via: 'consume when ready' },
          ],
        },
      ],
    },

    { type: 'h2', text: 'Where eventual consistency comes in' },
    {
      type: 'p',
      text: 'Once lifecycle changes travel over Kafka, a consumer sees them slightly after they happen. For a window, its view can be stale. That is acceptable for some operations and not for others, and the useful question is which is which.',
    },
    {
      type: 'table',
      head: ['Question about the call', 'If yes', 'If no'],
      rows: [
        ['Does the caller need the answer right now?', 'gRPC', 'Kafka is an option'],
        ['Must the operation survive the consumer being down?', 'Kafka', 'gRPC is fine'],
        ['Is a short period of stale data acceptable?', 'Kafka', 'gRPC (read the source of truth)'],
      ],
    },
    {
      type: 'p',
      text: 'Identity lookups at login fail the first and third questions, so they go over gRPC. Lifecycle changes pass the second and third, so they go over Kafka.',
    },

    { type: 'h2', text: 'Decision' },
    {
      type: 'callout',
      tone: 'decision',
      title: 'Decision',
      text: 'gRPC with Protocol Buffers for the synchronous identity and manager lookup path. Kafka retained for lifecycle events that can tolerate eventual consistency.',
    },
    {
      type: 'callout',
      tone: 'tradeoff',
      title: 'Trade-off accepted',
      text: 'Two communication patterns to maintain instead of one. Protocol Buffers are binary, so they are not human-readable without the shared .proto schema.',
    },
    {
      type: 'callout',
      tone: 'failure',
      title: 'Failure scenario handled',
      text: 'If the Auth Service is down, identity lifecycle events still queue in Kafka and are processed on recovery. Lifecycle operations are not blocked by Auth availability.',
    },

    { type: 'h2', text: 'Result' },
    {
      type: 'metrics',
      items: [
        {
          label: 'Inter-service authentication latency (Auth, Identity, Access Portal)',
          before: 'REST baseline',
          after: '50% lower',
          note: 'After migrating those calls from REST to gRPC.',
        },
      ],
    },

    { type: 'h2', text: 'What I would change today' },
    {
      type: 'p',
      text: 'I would write the acceptable staleness window down as a number for each event type. "Tolerates eventual consistency" is an assumption until it has a measured bound, and a bound is what lets you alert when consumers fall behind.',
    },
  ],
}
