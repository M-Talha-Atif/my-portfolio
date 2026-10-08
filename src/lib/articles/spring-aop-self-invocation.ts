import type { Article } from './types'

export const springAopSelfInvocation: Article = {
  slug: 'spring-aop-self-invocation',
  title: 'Spring AOP Self-Invocation: How an Audit Trail Was Silently Skipped',
  description:
    'The audit aspect existed, compiled and passed review. It did not fire for calls made from inside the same bean, and compliance depended on it.',
  category: 'Backend Engineering',
  tags: ['Spring Boot', 'AOP', 'Compliance', 'Audit'],
  date: '2026-10-09',
  source: 'From my work on the Access Portal, an enterprise identity governance platform at Intimec via MicroTechX.',
  ogLines: ['Spring AOP self-invocation', 'The audit that did not fire'],
  blocks: [
    { type: 'h2', text: 'The problem' },
    {
      type: 'p',
      text: 'Audit advice was silently not firing on certain rule engine methods. Nothing failed. No exception, no log line. The audit record simply was not written for those calls, and in a compliance system the audit trail is not optional.',
    },

    { type: 'h2', text: 'Why it happens' },
    {
      type: 'p',
      text: 'Spring AOP works with proxies. When another bean calls your bean, the call goes through a proxy that applies the aspect before and after the method. When a method calls another method on the same bean with a plain method call, it goes straight to the real object. The proxy is bypassed, and so is the aspect.',
    },
    {
      type: 'diagram',
      title: 'Calls that go through the proxy and calls that do not',
      rows: [
        {
          label: 'From another bean',
          nodes: [
            { label: 'Caller bean' },
            { label: 'Proxy', sub: 'audit advice runs', state: 'highlight', via: 'call' },
            { label: 'RuleEngine.applyRule()', via: 'delegates' },
          ],
        },
        {
          label: 'From inside the same bean',
          nodes: [
            { label: 'RuleEngine.evaluate()' },
            { label: 'RuleEngine.applyRule()', sub: 'no proxy, no audit', state: 'fail', via: 'this.applyRule()' },
          ],
        },
      ],
    },
    {
      type: 'code',
      lang: 'java',
      title: 'Illustrative sketch of the bug (names are examples)',
      code: `@Service
class RuleEngine {

    public void evaluate(Identity identity) {
        applyRule(identity);          // plain call on "this": skips the proxy
    }

    @Audited
    public void applyRule(Identity identity) {
        // ... the audit advice does not run when reached from evaluate()
    }
}`,
    },

    { type: 'h2', text: 'Options' },
    {
      type: 'table',
      head: ['Option', 'Verdict'],
      rows: [
        [
          'Call through an injected reference to itself',
          'Works, but it is an unusual pattern that is confusing to maintain.',
        ],
        [
          'Switch to AspectJ compile-time weaving',
          'Solves the root cause, but it is a much larger architectural change affecting the whole codebase.',
        ],
        [
          'Extract the audited methods into a separate Spring bean',
          'Small and targeted. Calls now cross a bean boundary, so they go through the proxy.',
        ],
      ],
    },
    {
      type: 'code',
      lang: 'java',
      title: 'Illustrative sketch of the fix',
      code: `@Service
class RuleEngine {
    private final RuleApplier applier;

    RuleEngine(RuleApplier applier) { this.applier = applier; }

    public void evaluate(Identity identity) {
        applier.applyRule(identity);  // crosses a bean boundary: proxy applies
    }
}

@Service
class RuleApplier {
    @Audited
    public void applyRule(Identity identity) { /* ... */ }
}`,
    },

    { type: 'h2', text: 'Decision' },
    {
      type: 'callout',
      tone: 'decision',
      title: 'Decision',
      text: 'Extract the audited methods into a separate Spring bean.',
    },
    {
      type: 'callout',
      tone: 'tradeoff',
      title: 'Trade-off accepted',
      text: 'Slightly more classes and beans in the codebase, in place of a single consolidated service class.',
    },
    {
      type: 'callout',
      tone: 'failure',
      title: 'Failure scenario handled',
      text: 'The audit trail, a compliance requirement, can no longer be silently skipped because of an internal detail of how a method happened to be called.',
    },

    { type: 'h2', text: 'What I took from it' },
    {
      type: 'ul',
      items: [
        'A proxy-based feature depends on the call path, not just on the annotation. The same applies to transactional behavior in Spring.',
        'When a cross-cutting concern is a compliance requirement, a missing record is a defect even when nothing throws.',
      ],
    },

    { type: 'h2', text: 'What I would change today' },
    {
      type: 'p',
      text: 'I would add an integration test that calls each audited operation through its public entry point and asserts that an audit record exists afterwards. A test that checks the outcome catches this whole class of bug, regardless of which internal path was taken.',
    },
  ],
}
