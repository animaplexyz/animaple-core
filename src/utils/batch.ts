import { fetchHtml } from './fetchHtml';
import getBatch from '@/lib/getBatch';
import scrapeBatch from '@/lib/scrapeBatch';

const batch = async ({ batchSlug, animeSlug }: { batchSlug?: string, animeSlug?: string }) => {
  let batch: string | undefined = batchSlug;

  if (animeSlug) {
    const data = await fetchHtml(`/anime/${animeSlug}`);
    const batchData = getBatch(data);
    batch = batchData?.slug;
  }
  
  if (!batch) return false;

  const data = await fetchHtml(`/batch/${batch}`);
  const result = scrapeBatch(data);

  return result;
};

export default batch;