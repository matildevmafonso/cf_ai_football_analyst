# AI Football Analyst

An AI-powered tactical assistant built on Cloudflare Workers that provides professional scouting reports, match predictions, and tactical breakdowns for football matches.
This project was built as part of the Cloudflare AI App Assignment.


## Features

* **Tactical Analysis:** Generates deep-dive scouting reports using Llama 3.3 via Cloudflare Workers AI.
* **Smart Predictions:** Analyzes team identities to predict match outcomes.
* **Match History (Memory):** Saves every analysis to Cloudflare KV, creating a persistent database of past reports.



## Tech Stack

* **Runtime:** Cloudflare Workers
* **Framework:** Hono (Lightweight web framework)
* **AI Model:** `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
* **Database:** Cloudflare KV (Key-Value Storage)
* **Frontend:** HTML5, Tailwind CSS, Marked.js (for Markdown rendering)


## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/matildevmafonso/cf_ai_football_analyst.git
cd cf_ai_football_analyst
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Cloudflare KV

To enable the "Memory" requirement, you must create a KV namespace:

```bash
npx wrangler kv:namespace create FOOTBALL_KV
```

Copy the ID output from that command and update your `wrangler.jsonc` file:

```json
"kv_namespaces": [
  {
    "binding": "FOOTBALL_KV",
    "id": "<YOUR_NEW_ID_HERE>"
  }
]
```

---

## 🏃‍♂️ How to Run

### Local Development

To run the worker locally on your machine:

```bash
npx wrangler dev
```

Open your browser to `http://localhost:8787` (or the URL provided in the terminal).

### 🚀 Deploy to Production

To publish your worker to the Cloudflare global network:

```bash
npx wrangler deploy
```

The command will output your live URL (e.g., `https://cf_ai_football_analyst.your-subdomain.workers.dev`).

