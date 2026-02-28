const fs = require('fs');

async function syncDynamicContent() {
  try {
    console.log('Memulai proses pengambilan data dari API...');

    const response = await fetch('https://animaple-core.vercel.app/api/home');
    if (!response.ok) {
      throw new Error(`Gagal mengambil data. Status HTTP: ${response.status}`);
    }
    
    const json = await response.json();
    const ongoingAnime = json.data.ongoing_anime.slice(0, 5);

    let markdownContent = '\n### 📺 Pembaruan Anime Berlangsung (Ongoing)\n\n';
    markdownContent += '| Judul Anime | Episode | Hari Rilis |\n';
    markdownContent += '| :--- | :---: | :---: |\n';
    
    ongoingAnime.forEach(anime => {
      markdownContent += `| **[${anime.title}](${anime.otakudesu_url})** | ${anime.current_episode} | ${anime.release_day} |\n`;
    });
    
    const timestamp = new Date().toLocaleString('id-ID', { 
      timeZone: 'Asia/Jakarta', 
      dateStyle: 'full', 
      timeStyle: 'long' 
    });
    markdownContent += `\n*Pembaruan terakhir: ${timestamp} WIB*\n`;

    const readmePath = 'README.md';
    const readmeData = fs.readFileSync(readmePath, 'utf8');
    
    const startMarker = '';
    const endMarker = '';
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'g');
    
    const updatedReadme = readmeData.replace(
      regex, 
      `${startMarker}\n${markdownContent}\n${endMarker}`
    );
    
    fs.writeFileSync(readmePath, updatedReadme);
    console.log('Proses selesai: README.md berhasil diperbarui.');

  } catch (error) {
    console.error('Terjadi kesalahan sistem:', error);
    process.exit(1);
  }
}

syncDynamicContent();