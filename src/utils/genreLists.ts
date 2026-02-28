import { fetchHtml } from './fetchHtml';
import scrapeGenreLists from '../lib/scrapeGenreLists';
import type { genre as genreType } from '../types/types';

const genreLists = async (): Promise<genreType[]> => {
  const data = await fetchHtml(`/genre-list`);
  const result = scrapeGenreLists(data);

  return result;
};

export default genreLists;