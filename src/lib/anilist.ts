const ANILIST_API = "https://graphql.anilist.co";

const QUERY = `
query ($search: String) {
  Media (search: $search, type: ANIME) {
    id
    idMal
    bannerImage
    trailer {
      id
      site
    }
    nextAiringEpisode {
      episode
      airingAt
      timeUntilAiring
    }
    characters (sort: ROLE, perPage: 6) {
      edges {
        role
        node {
          name {
            full
          }
          image {
            large
          }
        }
        voiceActors (language: JAPANESE, sort: RELEVANCE) {
          name {
            full
          }
          image {
            large
          }
        }
      }
    }
    relations {
      edges {
        relationType
        node {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
          status
        }
      }
    }
  }
}
`;

export const fetchAnilistMetadata = async (title: string) => {
  // Membersihkan judul dari kata-kata sampah agar pencarian akurat
  const cleanTitle = title
    .replace(/Subtitle Indonesia/i, "")
    .replace(/Sub Indo/i, "")
    .replace(/Batch/i, "")
    .replace(/\(.*\)/, "") 
    .trim();

  try {
    const response = await fetch(ANILIST_API, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { search: cleanTitle }
      })
    });

    const json = await response.json();
    return json.data?.Media || null;
  } catch (error) {
    console.error("Anilist Fetch Error:", error);
    return null; 
  }
};