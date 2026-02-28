import { fetchHtml } from './fetchHtml';
import scrapeAnimeByGenre from '@/lib/scrapeAnimeByGenre';

const animeByGenre = async (genre: string, page: number | string = 1) => {
  const data = await fetchHtml(`/genres/${genre}/page/${page}`);
  const result = scrapeAnimeByGenre(data);

  return result;
};

export default animeByGenre;