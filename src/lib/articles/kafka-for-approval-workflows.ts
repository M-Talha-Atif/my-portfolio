import type { Article } from './types'

export const kafkaForApprovalWorkflows: Article = {
  slug: 'kafka-for-approval-workflows',
  title: 'Why Approval Workflows Use Kafka, Not REST or WebSockets',
  description:
    'An approval can take minutes or hours. The system has to survive any service being down in the meantime without silently losing the event.',
  category: 'Event-Driven Architecture',
  tags: ['Kafka', 'Event-driven', 'Reliability', 'Workflows'],
  date: '2026-10-09',
  source: 'From my work on the Access Portal, an enterprise identity governance platform at Intimec via MicroTechX.',
  ogLines: ['Approvals on Kafka', 'Not REST, not WebSockets'],
  featured: true,
  blocks: [
    { type: 'h2', text: 'The problem' },
    {
      type: 'p',
      text: 'In the Access Portal, a request for access moves through approval before anything is provisioned. The Access Portal had to tell the Workflow Service about each submitted request, and the Workflow Service had to tell the rest of the system about approval, rejection and completion.',
    },
    {
      type: 'p',
      text: 'That communication runs across a distributed system where any service can be temporarily unavailable, and an approval is not a millisecond operation. It can take minutes or hours.',
    },

    { type: 'h2', text: 'Constraints' },
    {
      type: 'ul',
      items: [
        'Any service can be down at the moment an event is produced.',
        'An event must never be silently lost. This is an access control system with an audit requirement.',
        'The process is long-running, so holding a connection open for the whole approval is wasteful.',
      ],
    },

    { type: 'h2', text: 'Options' },
    {
      type: 'table',
      head: ['Option', 'What it gives you', 'Why it did not fit'],
      rows: [
        [
          'REST',
          'Simple and synchronous',
          'Ties the caller\'s availability directly to the callee\'s. If a message is lost mid-failure there is no replay.',
        ],
        [
          'WebSockets',
          'Real-time, bidirectional',
          'Needs a persistent connection for a process that lasts minutes to hours, and adds connection-state complexity for no benefit.',
        ],
        [
          'Kafka',
          'Async, durable, replayable, decouples producer from consumer',
          'Operational cost of running and monitoring a cluster.',
        ],
      ],
    },

    { type: 'h2', text: 'What the failure looks like' },
    {
      type: 'diagram',
      title: 'A consumer is down when the event is published',
      caption: 'The event is stored, not dropped. The producer does not need to know the consumer is down or retry.',
      rows: [
        {
          label: 'Approval granted',
          nodes: [
            { label: 'Workflow Service', sub: 'publishes "approved"' },
            { label: 'Kafka topic', sub: 'event stored durably', state: 'highlight', via: 'publish' },
            { label: 'Provisioning Service', sub: 'down', state: 'fail', via: 'unavailable' },
          ],
        },
        {
          label: 'Service recovers',
          nodes: [
            { label: 'Kafka topic', sub: 'event still there', state: 'highlight' },
            { label: 'Provisioning Service', sub: 'processes the event', via: 'consume' },
          ],
        },
      ],
    },

    { type: 'h2', text: 'Decision' },
    {
      type: 'callout',
      tone: 'decision',
      title: 'Decision',
      text: 'Kafka for the communication between the Access Portal, the Workflow Service and the services that act on approvals.',
    },
    {
      type: 'callout',
      tone: 'tradeoff',
      title: 'Trade-off accepted',
      text: 'The operational complexity of running and monitoring a Kafka cluster, and the loss of the simplicity of a direct synchronous call.',
    },
    {
      type: 'callout',
      tone: 'failure',
      title: 'Failure scenario handled',
      text: 'If the Provisioning Service is down when an approval event is published, the event waits in Kafka and is processed when the service recovers. No data is lost and the caller does not need to retry.',
    },

    { type: 'h2', text: 'What I took from it' },
    {
      type: 'p',
      text: 'Event-driven architecture is the right choice when reliability matters more than speed. Approval workflows do not need millisecond responses. They need to never silently lose an event.',
    },

    { type: 'h2', text: 'What I would change today' },
    {
      type: 'p',
      text: 'Durability protects against a consumer being down. It does not protect against an event the consumer can never process. I would define a dead-letter path and a retry limit for events that keep failing, so one bad message cannot block the rest of the stream or fail quietly.',
    },
  ],
}
