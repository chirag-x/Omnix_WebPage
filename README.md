<<<<<<< HEAD
# Omnix — Marketing site

A premium marketing site for Omnix, a voice-first AI desktop agent.

> Most assistants answer. **Omnix acts.**

---

## Stack

- React 18 + TypeScript (strict)
- Vite 5
- Tailwind CSS 3 (custom theme: `ink`, `accent`, `cyan`)
- Framer Motion 11
- Lucide icons
- react-router-dom 7 (for the 404 page)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build into ./dist
npm run preview      # serve the build locally
npm run lint         # type-check only
```

## Project layout

```
src/
  components/        # Sections, primitives, feature components
  data/              # All content lives here as TS modules
  hooks/             # Custom React hooks
  pages/             # Routed pages (NotFound, etc.)
  styles/            # Tailwind entry & globals
  config.ts          # Site config (brand, endpoints, links)
  i18n.ts            # Tiny translation shell
public/              # Static assets (favicon, robots, sitemap)
netlify/
  functions/         # /api/run, /api/health
```

---

## Deploying to Netlify

This repo is Netlify-ready. The `netlify.toml` at the root handles the build, the SPA redirects, and a security CSP. The `netlify/functions/` folder is published as Netlify Functions.

### Option A — Connect your Git repo (recommended)

1. Push this folder to GitHub (or GitLab/Bitbucket).
2. Go to https://app.netlify.com and click **Add new site → Import an existing project**.
3. Pick the repo. Netlify will auto-detect the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Click **Deploy site**. The first build takes ~1–2 minutes.
5. After it deploys you'll get a `https://<random>.netlify.app` URL. You can rename it under **Site settings → Domain management → Custom domains** (e.g. `omnix.dev`).

### Option B — Netlify Drop (no Git required)

1. Run `npm run build` locally. The output is in `dist/`.
2. Go to https://app.netlify.com/drop.
3. Drag the `dist/` folder onto the page. You'll get an instant URL.
4. To add the serverless functions, you'll need to use the Git path (or the CLI below) — Drop only ships static files.

### Option C — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init              # link the folder to a new site
netlify env:set OPENAI_API_KEY "sk-..."   # optional
netlify deploy --build    # draft URL
netlify deploy --prod     # promote to production
```

### Optional: real LLM behind `/api/run` (OpenRouter)

The function at `netlify/functions/run.js` returns a canned demo stream by default. To make it real, plug in an [OpenRouter](https://openrouter.ai) key:

1. Create an account and grab a key at https://openrouter.ai/keys.
2. Pick a model from https://openrouter.ai/models (any chat-completions model works — e.g. `meta-llama/llama-3.1-70b-instruct`, `qwen/qwen-2.5-72b-instruct`, `google/gemini-2.0-flash-exp:free`, etc.). If you don't pick one, the function uses `openrouter/auto`.
3. In Netlify: **Site settings → Environment variables → Add a variable**:
   - `OPENROUTER_API_KEY` = your key
   - `OPENROUTER_MODEL` = the model id (optional — defaults to `openrouter/auto`)
4. Redeploy.

When the key is present, the function streams from OpenRouter, parses the model's JSON-Lines output, and forwards it to the UI as live agent thoughts. If the call fails for any reason (rate limit, network, model down), the function falls back to the canned demo so the UI never breaks.

---

## Custom domain

1. In Netlify: **Site settings → Domain management → Add custom domain**.
2. Add the two `netlify.app` subdomains or your apex (`omnix.dev`).
3. For a custom domain, Netlify will show you the DNS records to add at your registrar (typically a `CNAME` for `www` and an `ALIAS`/`A` for the apex).
4. HTTPS is automatic via Let's Encrypt — give it ~1 minute after DNS resolves.

## Local preview of functions

```bash
netlify env:set OPENROUTER_API_KEY "sk-or-..."
netlify env:set OPENROUTER_MODEL "meta-llama/llama-3.1-70b-instruct"
netlify dev
```

This runs the site and the `netlify/functions` together on `http://localhost:8888`, so you can test the `/api/run` and `/api/health` endpoints end-to-end.

## Notes

- All animations honor `prefers-reduced-motion`.
- The site is fully data-driven: edit a file in `src/data/` and the relevant section updates.
- The voice orb (in `VoiceExperience`) and ambient hum (in the navbar) use the Web Audio API and require a user gesture to start.

---

## License

MIT.
=======
# omnix-webpage
>>>>>>> abad0ec5dfc9822d3b15abf93b0930db072dc233
