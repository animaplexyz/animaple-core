import { fetchHtml } from './fetchHtml';
import scrapeAnimeEpisodes from '@/lib/scrapeAnimeEpisodes';
import type { episode_list } from '@/types/types';

const episodes = async (slug: string): Promise<episode_list[] | undefined> => {
  const data = await fetchHtml(`/anime/${slug}`);
  const result = scrapeAnimeEpisodes(data);

  return result;
};

export default episodes;