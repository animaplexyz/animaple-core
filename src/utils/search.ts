import { fetchHtml } from './fetchHtml';
import scrapeSearchResult from '@/lib/scrapeSearchResult';
import { searchResultAnime } from '@/types/types';

const search = async (keyword: string): Promise<searchResultAnime[]> => {
  const html = await fetchHtml(`/?s=${keyword}&post_type=anime`);
  const searchResult = scrapeSearchResult(html);
  
  return searchResult;
};

export default search;