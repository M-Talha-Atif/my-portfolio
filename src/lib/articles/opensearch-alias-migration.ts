import type { Article } from './types'

export const opensearchAliasMigration: Article = {
  slug: 'opensearch-alias-migration',
  title: 'Migrating 5M+ OpenSearch Documents With an Alias Switch',
  description:
    'A mapping conflict broke aggregations in production, and OpenSearch cannot change the mapping of an existing field. The migration had to be invisible to users.',
  category: 'Data Engineering',
  tags: ['OpenSearch', 'Zero downtime', 'Migrations'],
  date: '2026-10-09',
  source: 'From my work on the Access Portal, an enterprise identity governance platform at Intimec via MicroTechX.',
  ogLines: ['OpenSearch migration', 'Switching an alias, not an index'],
  blocks: [
    { type: 'h2', text: 'The problem' },
    {
      type: 'p',
      text: 'The production OpenSearch index had mapping conflicts on high-cardinality fields: a text plus keyword dual mapping that broke aggregation queries. More than 5M documents were in the index and people were using it.',
    },

    { type: 'h2', text: 'Constraints' },
    {
      type: 'ul',
      items: [
        'OpenSearch does not support changing the mapping of an existing field on an existing index.',
        'User-facing downtime was not acceptable.',
        'More than 5M documents had to end up under the corrected mapping.',
      ],
    },

    { type: 'h2', text: 'Options' },
    {
      type: 'table',
      head: ['Option', 'Verdict'],
      rows: [
        ['Change the mapping in place', 'Not supported for existing fields. It would mean deleting and rebuilding the index, which causes downtime.'],
        ['Full rebuild in a maintenance window', 'Simplest to implement, but the downtime is not acceptable.'],
        ['Alias-based migration', 'New index with the correct mapping, reindex in the background, verify, then switch an alias atomically.'],
      ],
    },
    {
      type: 'diagram',
      title: 'The alias is the only thing the application knows',
      rows: [
        {
          label: 'Before',
          nodes: [
            { label: 'Application' },
            { label: 'Alias', sub: 'logs', via: 'reads and writes' },
            { label: 'Old index', sub: 'conflicting mapping', state: 'fail' },
          ],
        },
        {
          label: 'During: background reindex, verify',
          nodes: [
            { label: 'Old index', sub: 'still serving' },
            { label: 'New index', sub: 'corrected mapping', state: 'highlight', via: 'reindex' },
          ],
        },
        {
          label: 'After: one atomic switch',
          nodes: [
            { label: 'Application' },
            { label: 'Alias', sub: 'logs', via: 'unchanged' },
            { label: 'New index', state: 'highlight' },
            { label: 'Old index', sub: 'kept for rollback', state: 'muted' },
          ],
        },
      ],
    },

    { type: 'h2', text: 'The shape of the migration' },
    {
      type: 'p',
      text: 'The application talks to the alias name, never to a concrete index name. That is the precondition. Everything else is done behind it.',
    },
    {
      type: 'code',
      lang: 'http',
      title: 'Illustrative sketch (index and field names are examples)',
      code: `# 1. New index with the corrected mapping
PUT logs-v2
{ "mappings": { "properties": { "user_id": { "type": "keyword" } } } }

# 2. Reindex in the background while v1 keeps serving
POST _reindex?wait_for_completion=false
{ "source": { "index": "logs-v1" }, "dest": { "index": "logs-v2" } }

# 3. After verification: swap the alias in a single atomic request
POST _aliases
{ "actions": [
    { "remove": { "index": "logs-v1", "alias": "logs" } },
    { "add":    { "index": "logs-v2", "alias": "logs" } }
] }`,
    },
    {
      type: 'p',
      text: 'Verification is the step that earns the cutover. Before switching, compare document counts and query results between the old and new index. The alias only moves once they agree.',
    },
    {
      type: 'callout',
      tone: 'note',
      title: 'A question every alias migration has to answer',
      text: 'What happens to documents written while the reindex is running? The plan for that window has to be explicit before the switch, because the alias moves traffic, not data.',
    },

    { type: 'h2', text: 'Decision' },
    {
      type: 'callout',
      tone: 'decision',
      title: 'Decision',
      text: 'Alias-based migration: create the new index, reindex in the background, verify, switch the alias atomically.',
    },
    {
      type: 'callout',
      tone: 'tradeoff',
      title: 'Trade-off accepted',
      text: 'More steps and more careful verification than a straightforward rebuild: document counts and query results compared between old and new index before cutover.',
    },
    {
      type: 'callout',
      tone: 'failure',
      title: 'Failure scenario handled',
      text: 'If the reindex fails partway, the alias still points at the old index. Production traffic is unaffected until the new index is verified correct.',
    },

    { type: 'h2', text: 'Result' },
    {
      type: 'metrics',
      items: [
        { label: 'Downtime during the migration', before: 'Rebuild would have required it', after: 'None' },
        { label: 'Documents migrated', before: 'Conflicting mapping', after: '5M+ under the corrected mapping' },
        {
          label: 'Analytics throughput after the schema redesign',
          before: 'Production drift',
          after: '100K+ logs per cycle',
        },
      ],
    },

    { type: 'h2', text: 'What I would change today' },
    {
      type: 'p',
      text: 'I would write the rollback down before the cutover: the exact alias request that points back at the old index, and how long the old index is kept. Because the alias switch is atomic, rollback is a single call, but only if the old index still exists.',
    },
  ],
}
