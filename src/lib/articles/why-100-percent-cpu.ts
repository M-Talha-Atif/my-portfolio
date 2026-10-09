import type { Article } from './types'

export const why100PercentCpu: Article = {
  slug: 'why-100-percent-cpu-doesnt-mean-what-you-think',
  title: 'Why 100% CPU Doesn’t Mean What You Think It Means',
  description:
    'Pages were slow and the database sat at 100% CPU, so the database got the blame. A SQL trace showed one COUNT(*) query running roughly 80 to 90 times a second.',
  category: 'Performance',
  tags: ['Backend Development', 'Software Engineering', 'Design Systems', 'Debugging', 'Operating Systems'],
  date: '2026-07-14',
  source: 'Originally published on Medium. Based on a production performance investigation.',
  ogLines: ['Why 100% CPU Doesn’t', 'Mean What You Think It Means'],
  featured: true,
  blocks: [
    { type: 'h2', text: 'The Database Wasn’t the Problem. It Was Just Loud About It.' },
    {
      type: 'p',
      text: `Here’s the thing everyone assumed first. Pages are loading slow, so the database CPU must be at 100 percent, so the database is guilty. Case closed, right.`,
    },
    {
      type: 'p',
      text: `Wrong. That’s not a root cause. That’s just an observation dressed up as an answer.`,
    },
    {
      type: 'p',
      text: `Before blaming anything, I forced myself to ask a few basic questions. Is the database actually the bottleneck or is it just the thing showing symptoms. Are all APIs slow or only a few. Is it CPU, disk, network, or too many queries hitting at once. And the one that actually mattered here, why are images and CSS loading instantly while APIs crawl.`,
    },
    {
      type: 'p',
      text: `That last question is the whole clue. Static files like images and CSS don’t touch the database at all, they get served straight from a CDN or web server. So if only the API calls are slow, the problem lives somewhere in the backend to database path, not everywhere.`,
    },

    { type: 'h2', text: 'Following one request' },
    {
      type: 'p',
      text: `I traced a single API request end to end, like following a wire from the wall socket to the bulb.`,
    },
    {
      type: 'p',
      text: `Client opens a TCP socket, the kernel grabs the incoming bytes and hands them off via read(), then your backend process takes it from there through the database driver straight into the database engine.`,
    },
    {
      type: 'diagram',
      title: 'Client to DB layer',
      rows: [
        {
          nodes: [
            { label: 'Client', sub: 'opens a TCP socket' },
            { label: 'Kernel', sub: 'holds the bytes in its own memory', via: 'incoming bytes' },
            { label: 'Backend process', sub: 'user space', via: 'read()' },
            { label: 'Database driver' },
            { label: 'Database engine', state: 'highlight' },
          ],
        },
      ],
    },
    {
      type: 'p',
      text: `Quick detour on that kernel step, because it trips people up. Your database never touches raw internet bytes directly. The kernel catches them first and holds them in its own memory. Then it copies that data into user space, which is just the area where your actual program lives and runs. For one request this copy costs nothing. Do it thousands of times a second and it starts showing up on your CPU graph.`,
    },

    { type: 'h2', text: 'Why does the database even burn CPU' },
    {
      type: 'p',
      text: `People imagine \`SELECT * FROM Items\` as the database just reading data off disk. It's not that simple. Before it reads a single row, it does this:`,
    },
    {
      type: 'ul',
      items: [
        `Turns your SQL text into pieces, this is called tokenizing, basically breaking the sentence into words the engine understands`,
        `Builds a tree structure out of those pieces, called a syntax tree, so it actually knows what you’re asking instead of just seeing raw text`,
        `Checks the semantics, meaning does the table exist, does the column exist, do you have permission, do the data types even match up`,
        `Picks a plan, full scan, index scan, join type, whatever it estimates is cheapest`,
        `Only then actually runs it and reads your rows`,
      ],
    },
    {
      type: 'p',
      text: `Every single one of those steps costs CPU, and people usually skip straight to the last step in their head. Parsing feels like it should be instant since it’s just text, but building that tree and checking semantics both mean the engine is doing real work before touching a single row. And the planning step is genuinely one of the most expensive parts, because the database is comparing multiple strategies and estimating cost for each before it picks a winner.`,
    },

    { type: 'h2', text: 'What we actually found' },
    {
      type: 'p',
      text: `At this point I had a theory but no proof. I needed to actually see which queries were hitting the database, and how often. The tool for that is called a SQL trace, it basically logs every single query that runs so you can look back and see what really happened.`,
    },
    {
      type: 'p',
      text: `Here’s the catch though. You can’t just leave a trace running all day on a live production system. Every query it logs means extra writing, extra CPU, extra disk work, so the trace itself starts adding load on top of the load you’re trying to investigate. Turning it on and forgetting about it would make things worse, not better.`,
    },
    {
      type: 'p',
      text: `So I turned it on for just 20 minutes. Enough time to catch a real, honest sample of what’s actually happening, without adding real damage to users on the site at that moment.`,
    },
    { type: 'p', text: `When I looked at the results, one query stood out immediately.` },
    { type: 'code', lang: 'sql', code: `SELECT COUNT(*) FROM Items;` },
    {
      type: 'p',
      text: `This single line showed up close to 100,000 times in those 20 minutes. Do the math on that and it comes out to roughly 80 to 90 times every single second, just for one endpoint, just for one simple count query.`,
    },
    {
      type: 'p',
      text: `That’s the moment it stopped being a guess and became a fact. One query, running way more than it should, was quietly eating the CPU the whole time.`,
    },

    { type: 'h2', text: 'Why COUNT(*) is not free' },
    {
      type: 'p',
      text: `Most people, myself included at some point, assume counting rows is basically instant. Like the database has a little number sitting somewhere and it just hands it to you. It doesn’t work that way.`,
    },
    {
      type: 'p',
      text: `Here’s what actually happens. Say your table has a million rows. The database can’t just say “a million” and move on, because not every row is necessarily visible to your query at that exact moment.`,
    },
    {
      type: 'p',
      text: `Databases run on something called transaction rules, which decide what data you’re allowed to see based on when your query started and what other queries are doing at the same time. So to give you an exact count, the engine usually has to scan through table pages, or an index if one fits, and check each row against those rules before it can count it.`,
    },
    {
      type: 'p',
      text: `Think of it like being asked how many people are in a stadium, but you’re not allowed to trust the scoreboard, you have to walk every aisle and count heads yourself, because some people just walked in and some just left. That’s basically what COUNT(*) is doing every time you call it.`,
    },
    {
      type: 'p',
      text: `And every one of those scans costs something real. CPU to do the checking, memory to hold what it’s scanning, and disk reads too if that data isn’t already sitting in cache. Run that 80 times a second like we saw earlier, and you’re not asking one question, you’re asking the database to walk the stadium 80 times every second.`,
    },
    {
      type: 'p',
      text: `Now the obvious question is, why doesn’t the database just remember the last count and save itself the trouble. Here’s why it can’t. Say the count right now is 10. A second later, someone inserts a new row, so the true count becomes 11.`,
    },
    {
      type: 'p',
      text: `If the database had cached that old number 10 and just handed it back to you, you’d be looking at wrong data without even knowing it. Imagine that being your order count, or your available stock, or your account balance. Being wrong quietly is worse than being slow honestly.`,
    },
    {
      type: 'p',
      text: `So databases choose to recalculate every time instead of guessing from a cached number. They care more about giving you the truth than giving you a fast answer. That tradeoff is exactly why this one query alone was enough to spike the CPU.`,
    },

    { type: 'h2', text: 'The part that made it worse' },
    { type: 'p', text: `Now add caching into this picture, because that’s where things really went wrong.` },
    {
      type: 'p',
      text: `Say the app doesn’t hit the database for this count every single time. Instead, it saves the number in Redis, which is basically a fast in-memory storage layer, and sets it to expire after 10 minutes. So for those 10 minutes, every user just gets the saved number instantly, no database involved at all. Sounds smart, and honestly it is, most of the time.`,
    },
    {
      type: 'p',
      text: `Here’s where it falls apart. At exactly minute 10, that cached value expires and disappears. Now imagine this page is popular, and right at that same second, 5,000 people happen to load it. Every single one of those 5,000 requests checks Redis, finds nothing there since it just expired, and does exactly what it’s supposed to do when the cache is empty, it goes and asks the database directly.`,
    },
    {
      type: 'p',
      text: `The problem is, all 5,000 of them do this at the exact same moment. Not one request rebuilding the cache while others wait, but 5,000 identical \`SELECT COUNT(*) FROM Items\` queries slamming the database within the same second. It's like a store having one cash register, and the second it opens, 5,000 people rush in at once instead of forming a line.`,
    },
    {
      type: 'diagram',
      title: 'Thundering Herd',
      rows: [
        {
          label: 'Minutes 0 to 10: cache is valid',
          nodes: [
            { label: '5,000 requests' },
            { label: 'Redis', sub: 'cached count', state: 'highlight', via: 'read' },
            { label: 'Database', sub: 'untouched', state: 'muted' },
          ],
        },
        {
          label: 'Minute 10: the cached value expires',
          nodes: [
            { label: '5,000 requests', sub: 'same second' },
            { label: 'Redis', sub: 'empty', via: 'cache miss' },
            { label: 'Database', sub: '5,000 identical COUNT(*) queries', state: 'fail', via: 'all at once' },
          ],
        },
      ],
    },
    {
      type: 'p',
      text: `This has a name, it’s called a thundering herd, sometimes called a cache stampede. The whole point of caching was to protect the database from repeated work, and for 10 minutes it does exactly that. But the moment it expires, it fails in the worst possible way, everyone hits the database at once instead of just one request quietly refreshing the cache for everyone else. And this usually happens right when the database is already under load, which is exactly why it hurts the most.`,
    },

    { type: 'h2', text: 'Fixing it, and why each option fits or doesn’t' },
    {
      type: 'p',
      text: `Once I knew the actual problem, the next question was simple, how do you fix a query that runs 80 times a second and can’t just be cached the normal way without breaking on refresh. There’s no single right answer here, every option trades something for something else.`,
    },
    {
      type: 'table',
      head: ['Option', 'Fits because', 'Doesn’t because'],
      rows: [
        ['Scale the server (more CPU, RAM, SSD)', 'Fastest relief, zero code changes', 'Expensive, and it hides the real waste instead of fixing it'],
        ['Cache the count in Redis', 'Cuts response time from milliseconds to microseconds', 'Can go stale, and can stampede if not handled right'],
        ['Use an estimated count from DB stats', 'Almost free, great for dashboards and pagination', 'Not exact, useless for billing or inventory'],
        [
          'Keep a separate counter, update it on every write',
          'Instant reads, no scanning ever',
          'Every write gets a bit heavier, needs to stay consistent',
        ],
        [
          'Stop the stampede (let only one request rebuild the cache)',
          'Keeps traffic spikes from crushing the database',
          'Adds complexity, needs proper lock and timeout handling',
        ],
      ],
    },
    { type: 'p', text: `Let me break down what each one actually looks like in real life, not just in theory.` },
    {
      type: 'p',
      text: `Scaling the server is the easiest button to press. You throw more CPU and RAM at it and the pain goes away for a while, no code touched at all. But this is like fixing a leaking pipe by buying a bigger bucket. It works today, costs more every month, and the actual waste, that same query running way more than needed, is still sitting there quietly.`,
    },
    {
      type: 'p',
      text: `Caching in Redis is what most people reach for first, and it does cut response time massively, going from a real database round trip to basically reading from memory. But we already saw what happens when it expires badly, that’s the stampede problem from before. Caching alone isn’t a complete fix, it’s a fix that needs a partner.`,
    },
    {
      type: 'p',
      text: `Using an estimated count means asking the database for its rough internal number instead of the exact one, something databases already keep track of for planning purposes. It’s almost free to fetch. Good example, if you’re showing “About 12 million products” on a homepage, nobody cares if it’s off by a few thousand. But if you’re showing someone their exact order count or available stock before checkout, an estimate can straight up lie to a customer, so it’s not usable there.`,
    },
    {
      type: 'p',
      text: `Keeping a separate counter means instead of asking “how many rows exist” every time, you keep a running number updated every time something is added or removed, like a simple plus one or minus one. Reads become instant since you’re just reading a stored number, no scanning at all. The tradeoff is every write now does a bit more work, and if that counter update ever gets missed or fails silently, your number drifts from reality and needs repairing later.`,
    },
    {
      type: 'p',
      text: `Stopping the stampede means changing how the cache refresh works, so instead of 5,000 requests all rebuilding it at once, only one request is allowed to go rebuild the value while everyone else either waits a moment or gets served the slightly old number in the meantime. This protects the database completely during the refresh, but it adds real complexity, you now need locks, timeouts, and a plan for what happens if that one request fails.`,
    },
    {
      type: 'p',
      text: `None of these fit every case, and that’s the actual lesson here. If you need exact numbers because money or stock is involved, the estimate is out immediately no matter how tempting it is. If your writes are already heavy and slow, adding a counter on every write might hurt more than it helps. The right choice depends on what you genuinely cannot afford to get wrong, not on which option looks cleanest in a table like this one.`,
    },

    { type: 'h2', text: 'What actually mattered here' },
    {
      type: 'p',
      text: `Looking back at the whole thing, the CPU sitting at 100 percent was never actually the problem. It felt like the problem because it’s the number everyone sees first on a monitoring dashboard, big red bar, panic mode on. But that bar was just pointing a finger at something else happening underneath it. It was a symptom, not a cause.`,
    },
    {
      type: 'p',
      text: `The real problem was one line of SQL, \`SELECT COUNT(*) FROM Items\`, quietly running around 100,000 times in just 20 minutes, for no real reason anyone had noticed until we actually looked. Nobody wrote that on purpose to break anything, it just kept getting called over and over because nothing was stopping it, and it slowly became the thing eating most of the CPU on its own.`,
    },
    {
      type: 'p',
      text: `That’s usually how these things go. Nobody sits down and decides to slow the whole system down. It happens quietly, one small habit at a time, until it adds up into something big enough to notice.`,
    },
    {
      type: 'p',
      text: `So the real lesson isn’t about databases or Redis or counters specifically. It’s about the instinct you build over time. The fix isn’t always more hardware, even though that’s the easiest thing to reach for when something’s on fire. Sometimes the actual fix is just sitting down and asking why the CPU is busy in the first place, tracing it back to the one thing causing the noise, and removing that waste before you go spend money making a bigger machine to hide it.`,
    },
  ],
}
