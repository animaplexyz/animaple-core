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
</p>
