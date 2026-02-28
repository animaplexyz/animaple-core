# AnimapleCore API 🍁

![Version](https://img.shields.io/badge/version-v1.0.0-emerald.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**AnimapleCore API** is the official backend engine powering the **Project Animaple**. Built with Next.js, this RESTful API seamlessly scrapes and serves real-time anime data from the Otakudesu website, delivering fast, reliable, and structured JSON responses for frontend integrations.

> **Disclaimer:** This project is developed strictly for personal, educational purposes, and as the backend infrastructure for Project Animaple. Use it at your own risk.

## ✨ Features
- **Real-time Data Scraping:** Always get the latest updates, ongoing series, and complete batches.
- **Serverless Ready:** Fully optimized for seamless deployment on Vercel as Serverless Functions.
- **Modern Stack:** Built on top of Next.js App Router for maximum performance and caching.
- **Clean JSON Structure:** Professional and predictable data mapping for easy frontend consumption.

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

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

### Running Locally

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the API dashboard.

## 📡 Available Endpoints

Here are some of the main endpoints provided by AnimapleCore:

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/home` | `GET` | Get homepage data (latest ongoing & complete anime) |
| `/api/search/{keyword}` | `GET` | Search for a specific anime by title |
| `/api/anime/{slug}` | `GET` | Get detailed information about a specific anime |
| `/api/episode/{slug}` | `GET` | Get streaming links and details for an episode |
| `/api/schedule` | `GET` | Get the weekly release schedule |
| `/api/genre` | `GET` | Get all available anime genres |

## 📝 License

This project is licensed under the [MIT License](./LICENSE).

---
<p align="center">
  <b>Project Animaple</b><br>
  Developed by <a href="https://github.com/ofikur">Ofikur R.</a>
</p>