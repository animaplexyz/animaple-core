import { fetchHtml } from './fetchHtml';
import scrapeAnimeByGenre from '@/lib/scrapeAnimeByGenre';

const animeByGenre = async (genre: string, page: number | string = 1) => {
  const path = (page === 1 || page === '1')
    ? `/genres/${genre}/`
    : `/genres/${genre}/page/${page}/`;

  const data = await fetchHtml(path);
  const result = scrapeAnimeByGenre(data);

  return result;
};

export default animeByGenre;