# AI Prompts Used

## 1. API + Worker Bootstrapping
> “Help me scaffold a Cloudflare Workers + Hono + Chanfana project that exposes an OpenAPI-compatible API.  
> Add TypeScript types for `Env` bindings and show how to register endpoints using `fromHono`.”

## 2. AI Football Analyst Endpoint
> “I am building an AI Football app on Cloudflare Workers.  
> Create a `POST /api/analyze` endpoint using Hono that:
> - Accepts `homeTeam`, `awayTeam`, optional `competition` and `notes` in JSON.
> - Calls Workers AI (for example `@cf/meta/llama-3.1-8b-instruct`) with a good prompt to generate a short scouting report, tactical keys and a soft prediction.
> - Saves the input + AI output to a KV namespace called `FOOTBALL_KV`.
> - Returns the saved key and the analysis as JSON.”

## 3. Frontend Prompt (if you used AI for UI)
> “Generate a very simple HTML/JS frontend that sends a JSON POST to `/api/analyze` and renders the returned analysis text on the page.  
> Style can be minimal; just make it readable.”
