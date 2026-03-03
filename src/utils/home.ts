import { load } from "cheerio"
import { fetchHtml } from "./fetchHtml"
import { fetchAnilistMetadata } from "@/lib/anilist"
import type { ongoingAnime, completeAnime } from "@/types/types"

const home = async () => {
  const html = await fetchHtml("home")
  const $ = load(html)

  // 1. Scrape Ongoing Anime
  const ongoing_anime: ongoingAnime[] = []
  $(".venutama .rapi:first ul li").each((i, el) => {
    const title = $(el).find(".thumb > a > .thumbz > .jdlflm").text()
    const slug = $(el).find(".thumb > a").attr("href")?.replace("https://otakudesu.cloud/anime/", "").replace("/", "")
    const poster = $(el).find(".thumb > a > .thumbz > img").attr("src")
    const current_episode = $(el).find(".epz").text()
    const release_day = $(el).find(".epztipe").text()
    const newest_release_date = $(el).find(".newnime").text()
    const otakudesu_url = $(el).find(".thumb > a").attr("href")

    ongoing_anime.push({
      title,
      slug,
      poster,
      current_episode,
      release_day,
      newest_release_date,
      otakudesu_url,
    })
  })

  // 2. MAGISNYA DI SINI: Inject Banner Anilist untuk 7 Anime Teratas (Carousel)
  // Kita batasi 7 saja agar loading home tidak lemot
  const topAnime = ongoing_anime.slice(0, 7);
  
  await Promise.all(
    topAnime.map(async (anime) => {
      if (anime.title) {
        const metadata = await fetchAnilistMetadata(anime.title);
        if (metadata && metadata.bannerImage) {
          anime.banner = metadata.bannerImage;
        }
      }
    })
  );

  // 3. Scrape Completed Anime
  const complete_anime: completeAnime[] = []
  $(".venutama .rapi:last ul li").each((i, el) => {
    const title = $(el).find(".thumb > a > .thumbz > .jdlflm").text()
    const slug = $(el).find(".thumb > a").attr("href")?.replace("https://otakudesu.cloud/anime/", "").replace("/", "")
    const poster = $(el).find(".thumb > a > .thumbz > img").attr("src")
    const episode_count = $(el).find(".epz").text()
    const rating = $(el).find(".epztipe").text()
    const last_release_date = $(el).find(".newnime").text()
    const otakudesu_url = $(el).find(".thumb > a").attr("href")

    complete_anime.push({
      title,
      slug,
      poster,
      episode_count,
      rating,
      last_release_date,
      otakudesu_url,
    })
  })

  return {
    ongoing_anime,
    complete_anime,
  }
}

export default home