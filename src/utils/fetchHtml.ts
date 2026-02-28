import axios from 'axios';

/**
 * Sistem Sentral Pengambil HTML via ScraperAPI
 * @param path Rute spesifik Otakudesu
 */
export const fetchHtml = async (path: string = ''): Promise<string> => {
  const BASEURL = process.env.BASEURL || '';
  const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY || '';

  const fullUrl = `${BASEURL}${path}`;

  const targetUrl = `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${fullUrl}`;

  const { data } = await axios.get(targetUrl);
  return data;
};