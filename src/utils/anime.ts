import { fetchHtml } from './fetchHtml';
import scrapeSingleAnime from '@/lib/scrapeSingleAnime';
import type { anime as animeType } from '@/types/types';

const anime = async (slug: string): Promise<animeType | undefined> => {
  const data = await fetchHtml(`/anime/${slug}`);
  const result = scrapeSingleAnime(data);

  return result;
};

export default anime;