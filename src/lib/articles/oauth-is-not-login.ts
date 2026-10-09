import type { Article } from './types'

export const oauthIsNotLogin: Article = {
  slug: 'oauth-is-not-login',
  title: 'OAuth Is Not “Login.” I Found That Out the Hard Way in Production',
  description:
    'OAuth is a permission system, not a login system. Letting an OAuth token and my own JWT share one cookie key logged users out in production.',
  category: 'Authentication',
  tags: ['OAuth2', 'OAuth', 'Backend Development', 'Software Engineering', 'Distributed Systems'],
  date: '2026-10-01',
  source: 'Originally published on Medium. Based on a production authentication bug I traced and fixed.',
  ogLines: ['OAuth is not “login”', 'It is a permission system'],
  ogDescription: 'OAuth is a permission system, not a login system. What it costs you, and the production bug that taught me the difference.',
  featured: true,
  blocks: [
    {
      type: 'p',
      text: `Most people, including a lot of engineers, think OAuth means “the button that says Sign in with Google.” That’s not wrong exactly, but it’s like saying a car is “the thing with a steering wheel.” Technically true, misses basically everything that matters.`,
    },
    {
      type: 'p',
      text: `I want to actually walk through what OAuth is, why it exists, what it costs you, and the specific way it bit me in production, because the bug taught me more about OAuth than any tutorial did.`,
    },
    { type: 'p', text: `If I use a term that sounds like engineer-speak, I’ll flag it like this:` },
    {
      type: 'p',
      text: `🚨 Jaggy jaggy alert: here’s the jargon, here’s what it actually means in plain English.`,
    },
    { type: 'p', text: `Let’s go.` },

    { type: 'h2', text: 'What OAuth actually is' },
    {
      type: 'p',
      text: `OAuth is not a login system. OAuth is a permission system. It answers one question: “can this app do this specific thing on my behalf, without me handing it my password?”`,
    },
    { type: 'p', text: `That’s it. That’s the whole idea.` },
    {
      type: 'p',
      text: `Before OAuth, if you wanted some third party app to, say, post to your Twitter or read your Gmail contacts, you had exactly one option: give that app your actual Twitter or Gmail password. The app would log in as you, directly, using your real credentials. Which means that random app now has full access to your account forever, until you go change your password, and even then you’re trusting a third party company stored your password responsibly in the first place.`,
    },
    {
      type: 'p',
      text: `OAuth replaces that with a system where you never hand your password to the third party app at all. Instead, you briefly go to Google (or whoever), log in there, and Google hands the app a token, a kind of limited, revocable permission slip, instead of your actual credentials.`,
    },
    {
      type: 'jargon',
      term: 'token',
      text: `Think of it as a hotel key card instead of your house key. It opens specific doors, for a specific amount of time, and the hotel can deactivate it instantly without you having to change your actual house locks.`,
    },

    { type: 'h2', text: 'Could the internet work without OAuth' },
    {
      type: 'p',
      text: `Technically, yes. Plenty of early 2000s apps worked exactly how I described above, you just gave them your password. It’s not that the internet collapses without OAuth.`,
    },
    {
      type: 'p',
      text: `What actually happens without it is worse in a slower, quieter way. Every app you connect to anything ends up holding a copy of your real password. A breach at any one of those apps means your actual account password leaks, not just some limited token. You can’t selectively revoke access (“let this app see my calendar but not send emails as me”) because the app either has your full password or it has nothing. And you can’t tell your bank, your email provider, or your social accounts “trust these five apps, not that one,” because from their point of view every connected app looks identical: someone logged in with your password.`,
    },
    {
      type: 'p',
      text: `So yes, the world could work without OAuth. It would just be a world where a breach anywhere is a breach everywhere, and “revoke access” isn’t really a button that exists.`,
    },

    { type: 'h2', text: 'A quick word on OAuth 1.0, the version before this one' },
    {
      type: 'p',
      text: `Before the OAuth everyone actually uses today, there was OAuth 1.0, back around 2007. Same basic idea, token instead of password, but the mechanics were painful. Every single request had to be cryptographically signed by the app using a shared secret, a process involving HMAC-SHA1 and exact timestamps, before the server would trust it.`,
    },
    {
      type: 'jargon',
      term: 'cryptographic',
      text: `Just means “based on math that’s specifically designed to be really, really hard to fake or reverse without the right secret ingredient.” When something is described as cryptographically secure, breaking it isn’t impossible, it’s just so expensive and slow that nobody sane bothers trying.`,
    },
    {
      type: 'jargon',
      term: 'signature (signing)',
      text: `Not a handwritten signature. A short code generated from the actual contents of a message plus a secret value, proving two things at once: this message wasn’t altered in transit, and it genuinely came from whoever holds that secret. Change one character of the message and the signature stops matching, which is exactly how tampering gets caught.`,
    },
    {
      type: 'jargon',
      term: 'secret',
      text: `A private value, basically a password, known only to the two parties who are supposed to trust each other. Whoever holds the secret can prove they are who they claim to be. Whoever doesn’t, can’t fake it convincingly. The whole system falls apart the moment that “secret” stops actually being secret.`,
    },
    {
      type: 'jargon',
      term: 'HMAC-SHA1 signing',
      text: `A way of mathematically stamping each request so the server can verify nothing was tampered with in transit, instead of just trusting an encrypted connection to do that job. You don’t need the math, just know it meant extra, fiddly cryptography homework on every single request.`,
    },
    {
      type: 'p',
      text: `In practice this meant developers spent real time fighting signature mismatches and clock sync issues instead of building their actual app. It worked, but it was miserable, and it still assumed every app had somewhere safe to keep a permanent secret. OAuth 2.0 showed up in 2012 and basically said, let’s just lean on HTTPS to protect the data in transit like everyone already does for everything else, and drop the per-request signing entirely.`,
    },
    {
      type: 'jargon',
      term: 'HTTPS',
      text: `The padlock in your browser’s address bar. It encrypts everything traveling between your browser and the server, so anyone snooping on the connection, a nosy coffee shop WiFi for instance, sees scrambled nonsense instead of your actual data. OAuth 2.0 leans on this instead of signing every request itself, which is most of why it’s so much simpler than OAuth 1.0.`,
    },
    {
      type: 'p',
      text: `Simpler for developers, which is exactly why OAuth 2.0 is the one that actually won and is what the rest of this article has been describing the whole time.`,
    },
    {
      type: 'p',
      text: `But that “every app has somewhere safe to keep a secret” assumption didn’t go away, it just got quietly inherited by OAuth 2.0. And a few years later, that assumption stopped being true for a huge chunk of apps. More on that in a minute.`,
    },

    { type: 'h2', text: 'How it actually works, the short version' },
    { type: 'p', text: `Here’s the flow in plain English, using “Sign in with Google” as the example:` },
    {
      type: 'p',
      text: `You click the button. The app sends you over to Google, not the other way around, you never type your Google password into the third party app’s own form. At Google, you log in (or you’re already logged in) and Google shows you a screen saying “This app wants to see your email and profile picture, allow it?” You say yes. Google then redirects you back to the app with a short-lived code. The app takes that code and, behind the scenes, trades it with Google for an actual token. From then on, the app uses that token to ask Google for the specific things you approved, nothing more.`,
    },
    {
      type: 'jargon',
      term: 'scope',
      text: `A scope is the specific permission being requested, like “read your email address” or “post on your behalf.” Apps are supposed to ask for the narrowest scope that does the job, though in practice a lot of apps ask for way more than they need, because broader scopes are easier to code against and nobody’s really checking.`,
    },
    {
      type: 'jargon',
      term: 'redirect URI',
      text: `This is the exact web address Google is allowed to send you back to after login. It’s locked in advance when the app registers with Google, specifically so an attacker can’t trick Google into sending your freshly issued code to some address they control instead.`,
    },
    {
      type: 'p',
      text: `That whole flow above quietly assumes one more thing: that the app trading the code for a token is a proper backend server, one that can hold onto a permanent, secret password of its own (a “client secret”) to prove to Google “yes, this request really is from the real app.” Which brings us to a problem nobody really had to think about back in 2012.`,
    },

    { type: 'h2', text: 'The problem nobody saw coming, apps that can’t keep a secret' },
    {
      type: 'p',
      text: `Fast forward a few years and suddenly half the apps in the world are single-page apps running entirely in the browser, or mobile apps sitting on someone’s phone. A SPA’s entire codebase gets shipped straight to the user, anyone can pop open dev tools and read it line by line. A mobile app’s installer can be decompiled by anyone with a weekend and mild curiosity. There is nowhere to actually hide a secret in either case. Whatever you bake in, someone can pull back out, which is a uniquely bad punchline for something literally called a “client secret.”`,
    },
    {
      type: 'jargon',
      term: 'client secret',
      text: `A password-like value, known only to the real backend and Google, used to prove a token request is genuinely coming from the real app and not an imposter. Fine when there’s a server to keep it locked up. Useless the moment the “app” is just JavaScript running on a stranger’s laptop.`,
    },
    {
      type: 'p',
      text: `The fix is called PKCE, Proof Key for Code Exchange, and it’s pronounced “pixie,” which might be the single most delightful name in all of security engineering.`,
    },
    {
      type: 'jargon',
      term: 'PKCE',
      text: `Instead of a long-lived secret baked into the app, the app invents a random, one-time value right before login starts, the code verifier, and sends over a hashed version of it, the code challenge, when kicking off the flow. At the very end, when trading the code for a token, it has to produce that original, un-hashed value again. If someone intercepts the authorization code mid-flow, it’s useless to them, they don’t have the random value that generated it, and they can’t fake having it either.`,
    },
    {
      type: 'jargon',
      term: 'hashing',
      text: `A one-way math function that turns any input into a fixed-length scrambled output, and crucially, you can’t run it backwards to get the original input out again. Same input always produces the same output, which is exactly what makes it useful here, the app can prove “I know the original value” without ever saying the original value out loud until the very last step.`,
    },
    {
      type: 'p',
      text: `No permanent secret to leak, because there was never a permanent secret to begin with, just a fresh, disposable value that self-destructs after one use. Genuinely a cleaner idea than the thing it replaced, and these days it’s recommended for basically every app, server backed or not.`,
    },

    { type: 'h2', text: 'The trade-off nobody puts on the slide' },
    {
      type: 'p',
      text: `Here’s what the “just add OAuth” tutorials gloss over: you’re trading simplicity for control, and that trade costs real engineering effort.`,
    },
    {
      type: 'p',
      text: `With a plain username and password system, you own the entire flow. One table, one hashing function, done. With OAuth, you now depend on a third party’s uptime, their API changing underneath you, tokens that expire and need refreshing, and an entire second system, your own backend, that has to track who’s logged in even though the actual login happened somewhere else entirely.`,
    },
    {
      type: 'jargon',
      term: 'refresh token',
      text: `Access tokens are deliberately short-lived, often an hour or less, so if one leaks, the damage window is small. A refresh token is a longer-lived, more sensitive token your backend holds onto quietly, so it can go get a fresh access token without making the user log in again every hour. Lose control of a refresh token and you’ve basically lost control of the session, so these need to be stored far more carefully than access tokens.`,
    },
    {
      type: 'p',
      text: `That’s the actual trade-off. You get: no passwords for you to store or leak, users can revoke access with one click from Google’s side, scoped and limited permissions, and single sign-on convenience. You pay for it with: more moving parts, a dependency on an external provider, token lifecycle management, and a genuinely larger surface area for things to quietly go wrong.`,
    },

    { type: 'h2', text: 'How I actually use this in production' },
    {
      type: 'p',
      text: `On one platform I worked on, we had Google OAuth as a social login option sitting alongside our own email and password system, with our own JWT issued after either path succeeded.`,
    },
    {
      type: 'jargon',
      term: 'JWT',
      text: `Short for JSON Web Token. This is different from an OAuth access token, even though people use the words interchangeably all the time. A JWT is a signed, self-contained token your own backend creates, that your own backend can verify without a database lookup, basically a sealed, tamper-proof note saying “this is user 482, and I, the server, vouch for that.” OAuth tokens come from Google. JWTs, in this setup, come from us.`,
    },
    {
      type: 'p',
      text: `That distinction, two different kinds of token doing two different jobs, is exactly where things went wrong for me once.`,
    },

    { type: 'h2', text: 'What actually goes wrong: my real production bug' },
    {
      type: 'p',
      text: `We had a production authentication bug where users were randomly getting logged out, or logged in as the wrong state, with no clear pattern. Intermittent, hard to reproduce locally, the worst kind of bug.`,
    },
    {
      type: 'p',
      text: `The root cause, once I actually traced it through production logs, was almost embarrassingly simple: the OAuth token coming back from the social login flow and our own JWT were both being stored under the same cookie key. Whichever one got written last silently overwrote the other. So depending on timing, a user’s session cookie might end up holding Google’s OAuth token instead of our own JWT, or vice versa, and the backend would try to verify it as the wrong type of token entirely, fail, and drop the session.`,
    },
    {
      type: 'p',
      text: `Nobody designed it that way on purpose. It happened because OAuth tokens and JWTs look similar enough, both are just strings you shove in a cookie, that it’s easy to treat them as interchangeable “auth stuff” instead of two distinct tokens with two distinct lifecycles and two distinct purposes. The fix was straightforward once I actually understood the distinction: give each token its own, clearly named cookie key, so they could never collide again.`,
    },
    {
      type: 'p',
      text: `The real lesson wasn’t the one line fix. It was that OAuth tokens and your own session tokens are not the same thing wearing a different hat, and treating them as the same thing is exactly the kind of assumption that only breaks in production, under real timing and real concurrent requests, never in your local dev environment where everything happens conveniently one at a time.`,
    },

    { type: 'h2', text: 'Other pitfalls worth knowing before you hit them' },
    {
      type: 'p',
      text: `A few more ways this goes sideways, things I’ve seen or would actively watch for:`,
    },
    {
      type: 'p',
      text: `Storing tokens in localStorage instead of an httpOnly cookie, which means any cross-site scripting vulnerability on your site can just read the token straight out and walk away with the user's session.`,
    },
    {
      type: 'jargon',
      term: 'httpOnly cookie',
      text: `A cookie flagged so that JavaScript running in the browser can’t read it at all, only the browser itself can send it along with requests. It’s a deliberate wall against exactly the kind of theft I just described.`,
    },
    {
      type: 'p',
      text: `Mismatched redirect URIs between what’s registered and what the app actually sends, which just breaks login outright and is a surprisingly common first deploy bug when you move from a local dev URL to a real production domain and forget to register the new one.`,
    },
    {
      type: 'p',
      text: `Asking for way more scopes than you need, which makes users nervous at the consent screen and gives you a bigger blast radius if your token ever does leak.`,
    },
    {
      type: 'p',
      text: `Treating “the user has an OAuth token” as “the user is logged in” without actually verifying who they are. OAuth by itself is about authorization, what you’re allowed to do, not identity. Actual login on top of OAuth is a separate layer called OpenID Connect, and conflating the two is a genuinely common source of security bugs.`,
    },

    { type: 'h2', text: 'So, do you actually need it' },
    {
      type: 'p',
      text: `If you’re building something small and internal, OAuth is probably overkill, a simple username and password system with properly hashed passwords is less to maintain and less to get wrong. OAuth earns its complexity the moment you want users to log in with an identity they already have elsewhere, or you want to act on a third party service on their behalf without ever touching their password. At that point, yes, deal with the token juggling, because the alternative, a world where “give the app your password” is normal, is worse in ways that only show up after something’s already gone wrong.`,
    },
    {
      type: 'p',
      text: `That’s the real shape of it. Not a login button. A permission system, with real trade-offs, that will absolutely find the one gap in your assumptions if you let two different tokens share a cookie key and call it a day.`,
    },
  ],
}
