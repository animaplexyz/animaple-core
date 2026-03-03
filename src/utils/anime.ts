import { fetchHtml } from "./fetchHtml" // <-- PERBAIKAN: Pakai kurung kurawal { }
import scrapeSingleAnime from "@/lib/scrapeSingleAnime"
import { fetchAnilistMetadata } from "@/lib/anilist"
import { anime } from "@/types/types"

const anime = async (slug: string): Promise<anime | undefined> => {
  const html = await fetchHtml(`anime/${slug}`)
  const data = scrapeSingleAnime(html)

  // Jika scraping gagal, langsung return undefined
  if (!data || !data.title) return data

  // --- Sinkronisasi ke Anilist ---
  try {
    const searchKeyword = data.title;
    const anilistData = await fetchAnilistMetadata(searchKeyword);

    if (anilistData) {
      return {
        ...data,
        // Metadata
        id_provider: {
          anilist: anilistData.id,
          mal: anilistData.idMal
        },
        // Visual
        banner: anilistData.bannerImage || data.poster, 
        trailer: anilistData.trailer ? {
          id: anilistData.trailer.id,
          site: anilistData.trailer.site,
          url: `https://www.youtube.com/watch?v=${anilistData.trailer.id}`
        } : null,
        // Airing
        next_airing: anilistData.nextAiringEpisode ? {
          episode: anilistData.nextAiringEpisode.episode,
          airing_at: anilistData.nextAiringEpisode.airingAt,
          time_until: anilistData.nextAiringEpisode.timeUntilAiring
        } : null,
        // Characters (Mapping data)
        characters: anilistData.characters?.edges?.map((edge: any) => ({
          name: edge.node.name.full,
          image: edge.node.image.large,
          role: edge.role,
          voice_actor: edge.voiceActors && edge.voiceActors[0] ? {
              name: edge.voiceActors[0].name.full,
              image: edge.voiceActors[0].image.large,
              language: "JAPANESE"
          } : null
        })) || [],
        // Relations (Sequel/Prequel)
        relations: anilistData.relations?.edges?.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title.romaji,
            type: edge.relationType,
            poster: edge.node.coverImage.large,
            status: edge.node.status
        })) || []
      }
    }
  } catch (err) {
    // Jika Anilist error, jangan biarkan API crash.
    // Cukup log error-nya dan kembalikan data scraping asli.
    console.error("Gagal sync Anilist:", err);
  }

  // Fallback: Kembalikan data scraping asli jika Anilist gagal/kosong
  return data
}

export default anime