import type { Article } from './types'

export const redisSingleThreaded: Article = {
  slug: 'redis-is-single-threaded-so-why-is-it-so-fast',
  title: 'Redis Is Single-Threaded… So Why Is It So Fast?',
  description:
    'Redis serves 100,000+ requests per second on one command-execution thread. The mechanism is I/O multiplexing, an event loop, and since Redis 6, I/O threads.',
  category: 'Databases',
  tags: ['Redis', 'Backend Development', 'System Design Concepts', 'Caching', 'Database'],
  date: '2026-03-07',
  source: 'Originally published on Medium.',
  ogLines: ['Redis is single-threaded', 'So why is it so fast?'],
  ogDescription: 'How one main thread serves thousands of clients: I/O multiplexing, the event loop, and I/O threading from Redis 6.',
  featured: true,
  blocks: [
    {
      type: 'p',
      text: `Redis is famous for being blazingly fast handling over 100,000 requests per second on modest hardware. But here’s what surprises most engineers: it does all this with just one thread. Not one thread per client. Not one thread per request. One main thread, period.`,
    },
    {
      type: 'p',
      text: `How does a single-threaded system talk to thousands of clients simultaneously without blocking? The answer lies in a sophisticated architecture built on event loops, I/O multiplexing, and a clever evolution from Redis 1 through Redis 7. Let’s break it all down from the ground up.`,
    },

    { type: 'h2', text: 'What is Redis and Why Do We Use It?' },
    {
      type: 'p',
      text: `Before diving into internals, let’s establish the basics. Redis (Remote Dictionary Server) is an in-memory data store that acts as a database, cache, and message broker. Think of it as a lightning-fast key-value store that lives entirely in RAM.`,
    },
    { type: 'p', text: `Why teams choose Redis:` },
    {
      type: 'ul',
      items: [
        `**Speed:** Since data lives in memory rather than on disk, read and write operations happen in microseconds, not milliseconds.`,
        `**Simplicity:** Redis provides simple data structures (strings, lists, sets, hashes) with intuitive commands.`,
        `**Versatility:** Use cases range from session storage and caching to real-time analytics and pub/sub messaging.`,
        `**Reliability:** Despite being in-memory, Redis offers persistence options and replication for durability.`,
      ],
    },
    {
      type: 'p',
      text: `The real magic happens when you understand how Redis achieves this performance. It’s not just about RAM, it’s about how Redis fundamentally handles network I/O and client connections.`,
    },

    { type: 'h2', text: 'The Core Mystery: One Thread, Thousands of Clients' },
    {
      type: 'p',
      text: `Let’s frame the problem clearly. Imagine you’re building a system that needs to serve 10,000 concurrent clients. The traditional approach would spawn 10,000 threads, one per client. But this creates massive overhead:`,
    },
    {
      type: 'ul',
      items: [
        `Context switching between threads kills CPU performance`,
        `Each thread consumes memory (typically 1–8 MB per thread)`,
        `Synchronization locks slow everything down`,
        `Race conditions become a nightmare`,
      ],
    },
    {
      type: 'p',
      text: `Redis takes a radically different approach. It uses one main thread for command execution combined with I/O multiplexing to handle network operations efficiently. This sounds impossible until you understand the mechanism behind it.`,
    },

    { type: 'h2', text: 'I/O Multiplexing: The Foundation' },
    {
      type: 'p',
      text: `I/O multiplexing is the technique that makes Redis’s architecture possible. Instead of blocking on each client connection waiting for data, Redis asks the operating system to monitor all connections simultaneously and notify it when any socket is ready.`,
    },
    {
      type: 'p',
      text: `Think of it like this: Imagine you’re a waiter in a restaurant with 100 tables. You don’t stand at table 1 waiting for their order, then move to table 2, and so on. Instead, you circulate through the restaurant, and customers signal you when they’re ready. I/O multiplexing is Redis doing exactly that, but with network connections instead of restaurant tables.`,
    },
    { type: 'p', text: `The operating system provides this capability through system calls:` },
    {
      type: 'ul',
      items: [
        `\`epoll\` on Linux (the most common production environment)`,
        `\`kqueue\` on macOS`,
        `\`select\`/\`poll\` as fallback mechanisms`,
      ],
    },
    {
      type: 'p',
      text: `These OS-level features watch multiple file descriptors (which represent network sockets) and tell Redis: “These three clients have data ready right now.”`,
    },

    { type: 'h2', text: 'The Event Loop: Redis’s Beating Heart' },
    {
      type: 'p',
      text: `At the core of Redis sits an event loop, an infinite loop that continuously processes events.`,
    },
    {
      type: 'p',
      text: `The event loop never blocks waiting on I/O. Instead, it processes whatever is ready right now, then goes back to sleep until the OS notifies it of the next ready event.`,
    },
    { type: 'p', text: `Here’s what happens step-by-step when a client sends a request:` },
    {
      type: 'ol',
      items: [
        `**Client sends data:** A client executes \`GET user:42\`. The bytes travel over the network.`,
        `**Data arrives at kernel buffer:** The OS receives the TCP packets and stores them in the kernel socket buffer, not in Redis memory yet.`,
        `**epoll detects readiness:** The Linux kernel’s epoll mechanism notices that socket file descriptor 5 now has data available.`,
        `**Event loop wakes up:** Redis’s event loop, which was sleeping in \`epoll_wait()\`, receives notification: "fd=5 is readable."`,
        `**Non-blocking read:** Redis calls \`read(fd=5)\` and immediately receives the data because epoll already confirmed it's available.`,
        `**Command execution:** Redis parses \`GET user:42\`, looks up the key in its in-memory hash table (O(1) operation), and retrieves the value.`,
        `**Response preparation:** Redis formats the response according to the RESP protocol.`,
        `**Non-blocking write:** Redis writes the response back to the socket buffer.`,
        `**Loop continues:** Redis returns to \`epoll_wait()\`, ready for the next event.`,
      ],
    },
    {
      type: 'p',
      text: `The entire process takes microseconds because everything happens in RAM with no blocking operations.`,
    },

    { type: 'h2', text: 'How epoll Actually Works' },
    {
      type: 'p',
      text: `Let’s demystify epoll, the Linux kernel feature that makes everything possible. The name simply means “event poll”: efficiently polling for events across many file descriptors simultaneously.`,
    },
    {
      type: 'p',
      text: `**Without epoll (the old, bad way):** Redis would need to check each of 10,000 sockets one by one: “Any data? Any data? Any data?” This is called busy polling and wastes enormous CPU cycles.`,
    },
    {
      type: 'p',
      text: `**With epoll (the Redis way):** Redis registers all socket file descriptors with epoll once, then simply asks: “Which sockets are ready right now?” The kernel maintains this information internally and responds instantly.`,
    },
    { type: 'p', text: `When a client sends data, here’s the kernel-level sequence:` },
    {
      type: 'ol',
      items: [
        `Network packet arrives at network interface`,
        `Kernel processes TCP packet and stores data in socket receive buffer`,
        `Kernel marks that file descriptor as “readable” in its internal epoll structure`,
        `When Redis calls \`epoll_wait()\`, kernel returns: "fd=5, fd=12, and fd=47 are readable"`,
        `Redis processes only those three sockets, not all 10,000`,
      ],
    },
    {
      type: 'p',
      text: `This selective notification is what enables Redis to scale efficiently. The kernel does the heavy lifting of monitoring connections; Redis just reacts to ready events.`,
    },

    { type: 'h2', text: 'File Descriptors: The Bridge Between Redis and the OS' },
    {
      type: 'p',
      text: `You’ll notice we keep mentioning “file descriptor 5” or “fd=3”. What exactly is a file descriptor?`,
    },
    {
      type: 'p',
      text: `A file descriptor is simply an integer that the operating system assigns to represent an open resource. When a client connects to Redis:`,
    },
    {
      type: 'ol',
      items: [
        `The OS creates a network socket (the actual connection)`,
        `The OS assigns it a number, like \`fd=7\``,
        `Redis stores this mapping: \`ClientA → fd=7\``,
        `All operations on that connection use this number`,
      ],
    },
    {
      type: 'p',
      text: `Redis never directly accesses the actual socket memory, that’s the kernel’s job. Redis just uses the file descriptor as a “claim ticket” to tell the OS: “I want to read from fd=7” or “Write this data to fd=7.”`,
    },
    {
      type: 'p',
      text: `File descriptors unify how programs interact with different resources. Whether it’s a file on disk, a network socket, or a pipe between processes, the same operations apply: \`read()\`, \`write()\`, and \`close()\`.`,
    },
    {
      type: 'p',
      text: `Every process starts with three standard file descriptors: stdin (0), stdout (1), and stderr (2). Everything opened after that gets sequential numbers: 3, 4, 5, and so on.`,
    },

    { type: 'h2', text: 'Blocking vs Non-Blocking I/O: The Critical Difference' },
    {
      type: 'p',
      text: `Understanding the difference between blocking and non-blocking I/O is crucial to grasping Redis’s architecture.`,
    },
    {
      type: 'p',
      text: `**Blocking I/O** says to the OS: “If there’s no data available, pause my execution until it arrives.” This is disastrous for Redis because one slow client would freeze the entire server, and all other clients would wait.`,
    },
    {
      type: 'p',
      text: `**Non-blocking I/O** says: “If there’s no data available, return immediately and tell me.” This alone would waste CPU cycles checking empty sockets repeatedly.`,
    },
    { type: 'p', text: `The magic happens when you combine non-blocking I/O with epoll:` },
    {
      type: 'ol',
      items: [
        `Redis uses epoll to sleep until data is definitely available`,
        `Redis uses non-blocking read to grab that data instantly`,
        `No waiting, no wasted CPU cycle`,
      ],
    },
    { type: 'p', text: `Here’s a comparison:` },
    {
      type: 'table',
      head: ['Aspect', 'Blocking read()', 'Non-blocking read() + epoll'],
      rows: [
        ['Waits for data', 'Yes (freezes thread)', 'No (returns immediately)'],
        ['CPU efficiency', 'Terrible', 'Excellent'],
        ['Scales to many clients', 'No', 'Yes'],
        ['Used by Redis', 'Never', 'Always'],
      ],
    },
    {
      type: 'p',
      text: `When partial data arrives (say a command split across multiple TCP packets), non-blocking I/O handles it gracefully. Redis reads whatever is available, stores it in a client input buffer, and waits for the next epoll event to complete the command. This ensures robustness without blocking.`,
    },

    { type: 'h2', text: 'Reading from Sockets: The Complete Journey' },
    {
      type: 'p',
      text: `Let’s trace exactly how Redis reads data from a socket. This is where theory meets practice.`,
    },
    { type: 'p', text: `The data flow architecture:` },
    {
      type: 'diagram',
      title: 'From the network to Redis memory',
      rows: [
        {
          nodes: [
            { label: 'Client', sub: 'sends TCP packets' },
            { label: 'Kernel socket buffer', sub: 'managed by the OS, not Redis', via: 'packets' },
            { label: 'epoll', sub: 'marks fd=5 readable', via: 'ready' },
            { label: 'Event loop', sub: 'wakes in epoll_wait()', state: 'highlight', via: 'notify' },
            { label: 'Input buffer', sub: 'in Redis', via: 'read(fd=5)' },
            { label: 'Parse, then execute', sub: 'in-memory hash table', state: 'highlight' },
          ],
        },
      ],
    },
    {
      type: 'p',
      text: `When a client executes \`SET user:42 "Talha"\`, here's the detailed sequence:`,
    },
    {
      type: 'p',
      text: `**Step 1:** Client sends TCP packets containing the command bytes.`,
    },
    {
      type: 'p',
      text: `**Step 2:** The operating system’s network stack receives these packets and stores them in the kernel socket receive buffer. This buffer is memory managed by the OS, not Redis.`,
    },
    {
      type: 'p',
      text: `**Step 3:** The kernel’s epoll mechanism detects that file descriptor 5 now has data available and marks it as readable.`,
    },
    {
      type: 'p',
      text: `**Step 4:** Redis’s event loop, which was sleeping in \`epoll_wait()\`, wakes up with notification: "fd=5 is readable."`,
    },
    {
      type: 'p',
      text: `**Step 5:** Redis calls \`read(fd=5, buffer)\` with non-blocking mode. Because epoll already confirmed data exists, this returns immediately.`,
    },
    {
      type: 'p',
      text: `**Step 6:** The kernel copies bytes from its socket buffer into Redis’s input buffer. The kernel buffer is then freed.`,
    },
    {
      type: 'p',
      text: `**Step 7:** Redis parses the bytes into a structured command: command=SET, key=user:42, value=Talha.`,
    },
    { type: 'p', text: `**Step 8:** Redis executes the command by updating its in-memory hash table.` },
    {
      type: 'p',
      text: `**Step 9:** Redis prepares the response (“+OK\\r\\n”) and writes it back to the socket.`,
    },
    {
      type: 'p',
      text: `This entire journey happens without Redis ever waiting or blocking. The event-driven architecture ensures that Redis only processes sockets that are actually ready.`,
    },

    { type: 'h2', text: 'Writing Responses: Handling Slow Clients' },
    {
      type: 'p',
      text: `Reading data is only half the story. Writing responses back to clients introduces another challenge: what if the client reads data slowly?`,
    },
    {
      type: 'p',
      text: `Redis handles this elegantly through write events. When Redis needs to send a large response (say, a 200 KB JSON blob), it doesn’t block waiting for the client to consume all that data. Instead:`,
    },
    {
      type: 'ol',
      items: [
        `Redis writes as much as possible to the kernel socket send buffer`,
        `If the buffer fills up (because the client is slow), Redis stops writing`,
        `Redis registers a WRITE event with epoll: “Notify me when fd=5 is writable”`,
        `Redis continues processing other clients`,
        `When the client reads some data and the buffer has space, epoll notifies Redis`,
        `Redis writes more data to the buffer`,
      ],
    },
    {
      type: 'p',
      text: `This prevents slow clients from blocking fast ones. The kernel manages buffer memory, and Redis simply reacts to writability events.`,
    },
    {
      type: 'diagram',
      title: 'A slow client does not block the others',
      rows: [
        {
          nodes: [
            { label: 'Redis', sub: 'writes a 200 KB response' },
            { label: 'Kernel send buffer', sub: 'fills up (slow client)', state: 'fail', via: 'write' },
            { label: 'WRITE event', sub: '“notify me when fd=5 is writable”', state: 'highlight', via: 'register with epoll' },
            { label: 'Other clients', sub: 'keep being served' },
          ],
        },
      ],
    },

    { type: 'h2', text: 'The Evolution: Redis Before Version 6' },
    {
      type: 'p',
      text: `For years, Redis 1 through 5 operated with complete single-threading. Everything happened in one thread:`,
    },
    {
      type: 'ul',
      items: [`Accepting new connections`, `Reading from sockets`, `Executing commands`, `Writing responses`],
    },
    {
      type: 'p',
      text: `This worked beautifully because Redis commands are fast (operating on in-memory data), and most workloads involved small payloads. The bottleneck wasn’t command execution, it was vertical: better CPUs and faster RAM meant better performance.`,
    },
    { type: 'p', text: `However, as systems evolved, new problems emerged:` },
    {
      type: 'p',
      text: `**Network I/O became the bottleneck:** Modern servers have 10+ Gbps network cards and dozens of CPU cores. Redis was using one core while the others sat idle. The main thread spent significant time copying large payloads to and from socket buffers.`,
    },
    {
      type: 'p',
      text: `**TLS encryption overhead:** When Redis added TLS support for secure connections, encryption and decryption consumed precious main thread time.`,
    },
    {
      type: 'p',
      text: `**Large response handling:** A single client requesting a massive dataset could pause the entire Redis instance while the main thread wrote megabytes to the socket.`,
    },

    { type: 'h2', text: 'Redis 6: The Threading Revolution' },
    {
      type: 'p',
      text: `Redis 6 introduced a carefully designed change: I/O threading. This is widely misunderstood, so let’s be precise about what changed and what didn’t.`,
    },
    { type: 'p', text: `**What Redis 6 did NOT change:**` },
    {
      type: 'ul',
      items: [
        `Command execution remains single-threaded`,
        `Data structures remain lock-free`,
        `Redis’s core consistency guarantees unchanged`,
      ],
    },
    { type: 'p', text: `**What Redis 6 DID change:**` },
    {
      type: 'ul',
      items: [
        `Network I/O operations can now use multiple threads`,
        `TLS encryption/decryption can be parallelized`,
        `Large reads and writes no longer monopolize the main thread`,
      ],
    },
    {
      type: 'diagram',
      title: 'Redis 6: I/O threads move the bytes, the main thread owns the data',
      rows: [
        {
          nodes: [
            { label: 'I/O thread', sub: 'reads the 200 KB request' },
            { label: 'Main thread', sub: 'executes GET (microseconds)', state: 'highlight', via: 'parsed command' },
            { label: 'I/O thread', sub: 'writes the 200 KB response', via: 'response' },
          ],
        },
      ],
    },
    {
      type: 'p',
      text: `**The critical rule:** Only the main thread touches Redis data structures. I/O threads handle the slow work of moving bytes between sockets and memory, but they never execute commands or modify data.`,
    },
    {
      type: 'p',
      text: `This preserves Redis’s single-threaded simplicity (no locks, no race conditions) while leveraging modern multi-core CPUs for network operations.`,
    },
    { type: 'p', text: `Consider a request for a 200 KB user profile:` },
    {
      type: 'p',
      text: `**Redis 5 behavior:** Main thread reads 200 KB, executes GET, writes 200 KB response. Total main thread time: significant.`,
    },
    {
      type: 'p',
      text: `**Redis 6 behavior:** I/O thread reads 200 KB, main thread executes GET (microseconds), I/O thread writes 200 KB. Main thread freed to serve other clients immediately.`,
    },
    {
      type: 'p',
      text: `This architectural evolution demonstrates Redis’s pragmatic approach: adopt multi-threading only where it provides clear benefits without compromising the simplicity and predictability of single-threaded execution.`,
    },

    { type: 'h2', text: 'Why Redis Stays Single-Threaded for Execution' },
    {
      type: 'p',
      text: `A common question arises at this point: If modern CPUs have many cores, why doesn’t Redis execute commands using multiple threads?`,
    },
    { type: 'p', text: `The answer reveals deep architectural wisdom:` },
    {
      type: 'p',
      text: `**Multi-threaded execution requires locks:** If multiple threads modify the same hash table simultaneously, you need mutexes or other synchronization primitives.`,
    },
    {
      type: 'p',
      text: `**Locks destroy performance:** Lock contention and the overhead of acquiring/releasing locks would negate any parallelism benefits for Redis’s use case.`,
    },
    {
      type: 'p',
      text: `**Determinism is lost:** Single-threaded execution provides predictable, reproducible behavior critical for debugging and reasoning about systems.`,
    },
    {
      type: 'p',
      text: `**Redis commands are fast:** Most commands complete in microseconds. The overhead of coordinating multiple threads would exceed the command execution time.`,
    },
    {
      type: 'p',
      text: `Redis chose predictable performance over raw parallelism. For workloads requiring massive parallelization, Redis Cluster provides horizontal scaling instead.`,
    },

    { type: 'h2', text: 'Bringing It All Together' },
    {
      type: 'p',
      text: `Redis’s performance isn’t magic, it’s the result of carefully chosen architectural decisions:`,
    },
    {
      type: 'ol',
      items: [
        `In-memory storage eliminates disk I/O latency`,
        `Single-threaded execution removes lock overhead and ensures consistency`,
        `Non-blocking I/O with epoll enables handling thousands of clients without threads`,
        `Event loop architecture processes only ready sockets efficiently`,
        `I/O threading (Redis 6+) offloads network operations to utilize modern multi-core CPUs`,
      ],
    },
    {
      type: 'p',
      text: `The genius lies in the combination. Redis uses the OS kernel’s epoll for efficient multiplexing, file descriptors as lightweight handles to connections, non-blocking system calls to avoid waiting, and a tight event loop to process everything rapidly.`,
    },
    {
      type: 'p',
      text: `When a client sends \`GET user:42\`, dozens of components work in harmony: kernel buffers, epoll notifications, file descriptors, event loop dispatch, in-memory hash table lookup, and response serialization, all happening in microseconds without a single thread waiting on I/O.`,
    },
    {
      type: 'p',
      text: `This architecture has proven so effective that it’s influenced countless other systems. Node.js, nginx, and many modern servers use similar event-driven, non-blocking I/O patterns pioneered by systems like Redis.`,
    },
    {
      type: 'p',
      text: `Understanding these internals doesn’t just explain Redis, it provides a mental model for building high-performance networked systems. Whether you’re debugging latency issues, designing APIs, or architecting distributed systems, the principles of event loops, non-blocking I/O, and efficient multiplexing remain universally applicable.`,
    },
    {
      type: 'p',
      text: `**Connect with me:** If this article helped you understand Redis internals better, feel free to reach out or share your thoughts.`,
    },
  ],
}
