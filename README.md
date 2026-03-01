# AnimapleCore API 🍁

![Version](https://img.shields.io/badge/version-v1.0.0-emerald.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.x-black?logo=next.js)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**AnimapleCore API** is a highly optimized, unofficial REST API engine powering the **Animaple Project**. Built with modern Next.js 16, this API seamlessly scrapes and serves real-time anime metadata and streaming links from Otakudesu, delivering lightning-fast, structured JSON responses for frontend integrations.

> **Disclaimer:** This project is an unofficial API developed strictly for personal and educational purposes. It is not affiliated with, maintained, or endorsed by Otakudesu. Use it responsibly and at your own risk.

## 🔗 Quick Links
- 📖 **[Interactive Documentation](https://animaple-core.vercel.app)**
- ⚖️ **[Terms of Service](https://animaple-core.vercel.app/terms)**

## ✨ Features
- **Cloudflare Bypass:** Utilizes ScraperAPI to reliably extract upstream data without blocks or captchas.
- **Smart Tiered Caching:** Leverages Vercel Edge Cache (6h/24h/7d) to minimize upstream requests, save quota, and maximize speed.
- **Enterprise Rate Limiting:** Secured by Upstash Redis (30 requests/minute per IP) to prevent abuse and DDoS attacks.
- **Clean JSON Structure:** Professional and predictable data mapping for effortless frontend consumption.

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.
- A [ScraperAPI](https://www.scraperapi.com/) key.
- An [Upstash Redis](https://upstash.com/) database for rate limiting.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ofikur/animaple-core.git
   cd animaple-core
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   SCRAPER_API_KEY="your_scraperapi_key"
   UPSTASH_REDIS_REST_URL="your_upstash_url"
   UPSTASH_REDIS_REST_TOKEN="your_upstash_token"
   ANIMAPLE_SECRET_KEY="your_secret_bypass_key"
   ```

### Running Locally

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the interactive API dashboard.

## 📡 Available Endpoints

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/home` | `GET` | Get homepage data (latest ongoing & complete anime) |
| `/api/ongoing-anime/{page}` | `GET` | Get paginated list of currently ongoing anime |
| `/api/complete-anime/{page}` | `GET` | Get paginated list of completed anime |
| `/api/search/{keyword}` | `GET` | Search for a specific anime by title |
| `/api/anime/{slug}` | `GET` | Get detailed information about a specific anime |
| `/api/episode/{slug}` | `GET` | Get streaming links and details for a standard episode |
| `/api/movie/{slug}` | `GET` | Get streaming links and details for an anime movie |
| `/api/batch/{slug}` | `GET` | Get download links for a full season batch (Zip/Rar) |
| `/api/schedule` | `GET` | Get the weekly release schedule |
| `/api/genre` | `GET` | Get all available anime genres |
| `/api/genre/{genre}/{page}` | `GET` | Get paginated list of anime based on a specific genre |

## 📝 License

This project is licensed under the [MIT License](./LICENSE).

---
<p align="center">
  <b>Animaple Project</b><br>
  Developed by <a href="[https://github.com/ofikur](https://github.com/ofikur)">Ofikur R.</a>
</p>