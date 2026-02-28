import { fetchHtml } from './fetchHtml';
import { load } from 'cheerio';
import pagination from '@/lib/pagination';
import scrapeOngoingAnime from '@/lib/scapeOngoingAnime';

const ongoingAnime = async (page: number | string = 1) => {
  const data = await fetchHtml(`/ongoing-anime/page/${page}`);
  const $ = load(data);
  const ongoingAnimeEls = $('.venutama .rseries .rapi .venz ul li').toString();
  const ongoingAnimeData = scrapeOngoingAnime(ongoingAnimeEls);
  const paginationData = pagination($('.pagination').toString());

  return { 
    paginationData,
    ongoingAnimeData
  };
};

export default ongoingAnime;