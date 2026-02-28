import axios from 'axios';
import { load } from 'cheerio';
import scrapeOngoingAnime from '@/lib/scapeOngoingAnime';
import scrapeCompleteAnime from '@/lib/scrapeCompleteAnime';
import { ongoingAnime as ongoingAnimeType, completeAnime as completeAnimeType } from '@/types/types';

const home = async (): Promise<any> => {
  const BASEURL = process.env.BASEURL;

  // Jika BASEURL kosong/belum diatur di Vercel, langsung beri tahu di browser
  if (!BASEURL) {
    return { error: "CRITICAL: BASEURL Environment Variable is missing in Vercel!" };
  }

  try {
    const { data } = await axios.get(BASEURL as string, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br', // Seringkali Cloudflare memblokir jika ini tidak ada
        'Referer': 'https://google.com'
      },
      // Jangan langsung crash jika dapat error 403 dari Cloudflare
      validateStatus: function (status) {
        return status >= 200 && status < 500; 
      }
    });

    // Jika Otakudesu memberikan halaman Challenge/Blokir Cloudflare (Biasanya 403 Forbidden)
    if (typeof data === 'string' && data.includes('Cloudflare')) {
      return { 
        error: "BLOCKED BY CLOUDFLARE: IP Vercel dicegat oleh sistem keamanan Otakudesu.",
        html_snippet: data.substring(0, 200) + "..."
      };
    }

    const $ = load(data);
    const ongoingAnimeEls = $('.venutama .rseries .rapi:first .venz ul li').toString();
    const completeAnimeEls = $('.venutama .rseries .rapi:last .venz ul li').toString();
    
    // Jika elemen tidak ditemukan (struktur web berubah atau diblokir)
    if (!ongoingAnimeEls || !completeAnimeEls) {
      return { error: "SCRAPING FAILED: Elemen HTML tidak ditemukan. Kemungkinan struktur web berubah atau terkena captcha." };
    }

    const ongoing_anime = scrapeOngoingAnime(ongoingAnimeEls);
    const complete_anime = scrapeCompleteAnime(completeAnimeEls);

    return {
      ongoing_anime,
      complete_anime
    };

  } catch (error: any) {
    // Tangkap error lainnya dan tampilkan
    return { 
      error: "AXIOS ERROR: Gagal mengambil data dari Otakudesu", 
      details: error.message 
    };
  }
};

export default home;