import { fetchHtml } from './fetchHtml';
import episodes from './episodes';
import scrapeEpisode from '@/lib/scrapeEpisode';

const episode = async (params: string | { episodeSlug?: string, animeSlug?: string, episodeNumber?: number }) => {
  let slug = '';

  if (typeof params === 'string') {
    slug = params;
  } else {
    if (params.episodeSlug) slug = params.episodeSlug;
    if (params.animeSlug && params.episodeNumber) {
      const episodeLists = await episodes(params.animeSlug);
      if (!episodeLists) return undefined;

      const splittedEpisodeSlug = episodeLists[0].slug?.split('-episode-') as string[];
      const prefixEpisodeSlug = splittedEpisodeSlug[0];
      const firstEpisodeNumber = splittedEpisodeSlug[1].replace('-sub-indo', '');

      slug = `${prefixEpisodeSlug}-episode-${params.episodeNumber - (parseInt(firstEpisodeNumber) == 0 ? 1 : 0)}-sub-indo`;
    }
  }

  if (!slug) return undefined;

  const data = await fetchHtml(`/episode/${slug}/`);
  const result = scrapeEpisode(data);

  return result;
};

export default episode;