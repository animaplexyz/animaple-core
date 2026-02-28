import { fetchHtml } from './fetchHtml';
import getBatch from '@/lib/getBatch';
import scrapeBatch from '@/lib/scrapeBatch';

const batch = async (params: string | { batchSlug?: string, animeSlug?: string }) => {
  let batchSlug: string | undefined;

  if (typeof params === 'string') {
    batchSlug = params;
  } else {
    batchSlug = params.batchSlug;
    if (params.animeSlug) {
      const data = await fetchHtml(`/anime/${params.animeSlug}/`);
      const batchData = getBatch(data);
      batchSlug = batchData?.slug;
    }
  }
  
  if (!batchSlug) return false;

  const data = await fetchHtml(`/batch/${batchSlug}/`);
  const result = scrapeBatch(data);

  return result;
};

export default batch;