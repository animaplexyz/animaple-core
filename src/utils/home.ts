import axios from 'axios';
import { load } from 'cheerio';
import scrapeOngoingAnime from '@/lib/scapeOngoingAnime';
import scrapeCompleteAnime from '@/lib/scrapeCompleteAnime';
import type { ongoingAnime as ongoingAnimeType, completeAnime as completeAnimeType } from '@/types/types';

interface HomeData {
  ongoing_anime: ongoingAnimeType[];
  complete_anime: completeAnimeType[];
}

interface ErrorData {
  error: string;
  message: string;
}

const home = async (): Promise<HomeData | ErrorData> => {
  const BASEURL = process.env.BASEURL || '';
  const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY || '';

  const targetUrl = `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${BASEURL}`;

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
      error: "Gagal mengambil data",
      message: error?.message || "Unknown Error"
    };
  }
};

export default home;