import axios from 'axios';

/**
 * Sistem Sentral Pengambil HTML via ScraperAPI
 * @param path Rute spesifik Otakudesu
 */
export const fetchHtml = async (path: string = ''): Promise<string> => {
  const BASEURL = process.env.BASEURL || '';
  const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY || '';

  const cleanBaseUrl = BASEURL.replace(/\/$/, ''); 
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${cleanBaseUrl}${cleanPath}`;

  const targetUrl = `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${fullUrl}`;

  try {
    const { data } = await axios.get(targetUrl);
    return data;
  } catch (error: any) {
    console.warn(`[Viera Warning] Gagal mengambil data dari ${fullUrl}:`, error.message);

    return "<html><body></body></html>";
  }
};