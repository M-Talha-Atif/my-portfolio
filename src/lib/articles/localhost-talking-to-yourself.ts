import type { Article } from './types'

export const localhostTalkingToYourself: Article = {
  slug: 'localhost-talking-to-yourself',
  title: 'Localhost: Talking to Yourself in the Digital World',
  description:
    'Typing localhost sends your request to your own machine through the loopback address 127.0.0.1, so nothing ever leaves your computer.',
  category: 'Networking',
  tags: ['Localhost', 'Local Server', 'IPv4'],
  date: '2025-02-25',
  source: 'Originally published on Medium.',
  ogLines: ['Localhost', 'Talking to yourself'],
  ogDescription: 'What really happens when you type localhost, and how it differs from visiting google.com.',
  blocks: [
    {
      type: 'p',
      text: `Have you ever tried talking to yourself? Well, that’s pretty much what happens when you use \`localhost\` on your computer! It’s like having a private conversation with your own machine without involving the outside world.`,
    },
    {
      type: 'p',
      text: `But what really happens when you type \`localhost\` in your browser? And how is it different from visiting a website like \`google.com\`? Let’s break it down in simple terms.`,
    },

    { type: 'h2', text: 'What Happens When You Type google.com?' },
    {
      type: 'p',
      text: `When you type \`google.com\` into your browser, a series of steps take place behind the scenes:`,
    },
    {
      type: 'ol',
      items: [
        `**DNS Resolution:** Your browser doesn’t understand \`google.com\` directly. It first reaches out to the Domain Name System (DNS), which acts like a phonebook for the internet, translating domain names into IP addresses. Google’s IP address is then returned to your browser.`,
        `**Connecting to the Server:** Now that your browser knows the IP address, it sends a request to Google’s servers.`,
        `**Receiving a Response:** Google’s server processes your request and sends back the webpage data.`,
        `**Displaying the Page:** Your browser paints the digital canvas with lightning speed, revealing the iconic Google homepage in all its sleek glory — the gateway to a world of information now at your fingertips`,
      ],
    },
    {
      type: 'diagram',
      title: 'Typing google.com',
      rows: [
        {
          nodes: [
            { label: 'Your browser' },
            { label: 'DNS', sub: 'the internet’s phonebook', via: 'what is google.com?' },
            { label: 'Google’s IP address', via: 'returned' },
            { label: 'Google’s server', sub: 'external, over the internet', state: 'highlight', via: 'request' },
            { label: 'Webpage', via: 'response' },
          ],
        },
      ],
    },
    {
      type: 'p',
      text: `This entire process involves external servers and network traffic, meaning your request goes through various systems before reaching its destination.`,
    },

    { type: 'h2', text: 'What Happens When You Type localhost?' },
    {
      type: 'p',
      text: `Unlike \`google.com\`, when you type \`localhost\`, your request never leaves your machine. Instead, it loops back to your own computer. It’s like throwing a ball at a wall and catching it when it bounces back—it doesn’t go anywhere else.`,
    },
    {
      type: 'diagram',
      title: 'Typing localhost',
      caption: 'The request never reaches the network. It turns around inside your own machine.',
      rows: [
        {
          nodes: [
            { label: 'Your browser' },
            { label: 'Loopback address', sub: '127.0.0.1 (IPv4) or ::1 (IPv6)', state: 'highlight', via: 'localhost' },
            { label: 'Server on your own machine', sub: 'e.g. python -m http.server', via: 'stays inside' },
          ],
        },
      ],
    },
    { type: 'p', text: `**Why does this happen?**` },
    {
      type: 'p',
      text: `Your machine has a special IP address called the loopback address, which is \`127.0.0.1\` (IPv4) or \`::1\` (IPv6). This address is reserved for internal communication. So, when you access \`localhost\`, your computer simply looks for files and services running locally, without ever reaching the internet.`,
    },

    { type: 'h2', text: 'Example: Running a Local Web Server' },
    {
      type: 'p',
      text: `Developers often use \`localhost\` to test websites before making them live. For example:`,
    },
    {
      type: 'code',
      lang: 'bash',
      code: `# Start a simple local web server in Python
python -m http.server 8000`,
    },
    {
      type: 'p',
      text: `Now, if you visit \`http://localhost:8000\`, your browser will display the contents of the local server instead of fetching a page from the internet.`,
    },

    { type: 'h2', text: 'Advantages of Using Localhost' },
    {
      type: 'ol',
      items: [
        `**Faster Response Time:** Since everything happens within your own machine, the round-trip time is effectively zero.`,
        `**No Internet Required:** You can test and develop applications without needing an internet connection.`,
        `**Better Security:** No external requests mean no risk of exposing your data to the web.`,
        `**Isolated Environment:** You can experiment freely without affecting live websites or servers.`,
      ],
    },
    {
      type: 'p',
      text: `To prove that \`localhost\` is lightning fast, try running this command in your terminal:`,
    },
    { type: 'code', lang: 'bash', code: `ping localhost` },
    { type: 'p', text: `You’ll see that the response time is practically zero milliseconds!` },

    { type: 'h2', text: 'Conclusion' },
    {
      type: 'p',
      text: `Localhost is like a digital mirror — it reflects whatever you send without involving anyone else. Whether you’re developing a website, testing an application, or simply curious about networking, understanding \`localhost\` is an essential skill. So, next time you use it, just remember: it’s like talking to yourself, but in the language of computers!`,
    },
  ],
}
