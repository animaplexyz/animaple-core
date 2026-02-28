import axios from 'axios';
import { load } from 'cheerio';
import scrapeOngoingAnime from '@/lib/scapeOngoingAnime';
import scrapeCompleteAnime from '@/lib/scrapeCompleteAnime';
import { ongoingAnime as ongoingAnimeType, completeAnime as completeAnimeType } from '@/types/types';

const home = async (): Promise<any> => {
  const BASEURL = process.env.BASEURL;
  const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;

  if (!BASEURL || !SCRAPER_API_KEY) {
    return { 
      error: "CRITICAL ERROR: Variabel Vercel belum lengkap!",
      status_BASEURL: BASEURL ? "Aman" : "KOSONG",
      status_APIKEY: SCRAPER_API_KEY ? "Aman" : "KOSONG",
      solusi: "Silakan ke Vercel > Deployments > Klik titik tiga > Redeploy"
    };
  }

  const targetUrl = `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${BASEURL}&render=true`;

  try {
    const { data } = await axios.get(targetUrl);
    const $ = load(data);
    
    const ongoingAnimeEls = $('.venutama .rseries .rapi:first .venz ul li').toString();
    const completeAnimeEls = $('.venutama .rseries .rapi:last .venz ul li').toString();
    
    const ongoing_anime = scrapeOngoingAnime(ongoingAnimeEls);
    const complete_anime = scrapeCompleteAnime(completeAnimeEls);

    return {
      ongoing_anime,
      complete_anime
    };
  } catch (error: any) {
    return {
      error: "ScraperAPI Gagal Menembus Otakudesu",
      message: error.message
    };
  }
};

export default home;