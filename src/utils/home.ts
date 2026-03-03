import { load } from 'cheerio';
import { fetchHtml } from './fetchHtml';
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
  try {
    const data = await fetchHtml('');
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