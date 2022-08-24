# Framework less Vanilla HTML/JS/CSS SPA Website

SPA Web Components Web App. Showcases Lit, which is tiny html element builder, awesome and a game changer for web components. "Web Components is dead" is highly exaggerated and total garbo. It is the future.

- Frameworkless. Thank the heavens!
- High Performance. "Performant" is not enough.
- Low Maintenance. No chasing low value framework updates.
- Consistent builds. No difference between dev and prod except compression/etc.
- Server and client reloads on changes.
- Flexible. Bring your own html element builder, router, test framework, web server and whatever you want.

## Getting Started

To install `npm i` or `yarn install`

To run: `npm run dev` or `yarn build`

VSCode has a lit-html extension.

## Directories

private - Server side app. Web server

public - Client side app.

dist/serve - everything here is public.

dist/server - Just run index.js in production.

## Production notes

- A production deployment requires node_modules to be located in dist. That is an easy cp or mv in your build system.

- For production. You'll have to think about whether you want fastify or nginx (etc.) to serve static content. With the current setup, fastify serves static content only in dev mode.
    - nginx, apache, fastify, etc. can point to "dist/serve" to serve static content. index.html must be served when no match.