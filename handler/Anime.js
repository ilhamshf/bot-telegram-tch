const axios = require('axios');

class Kusonime {

    constructor(client) {
        this.client = client;
    }

    getBySearch(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {

                const req = await axios.get(`http://localhost:3001/api/cari/${query}`);
                const res = req.data.data;

                if (res.length < 1) return message.reply(`Tidak ditemukan judul ${query}!`);
                const chunk = this.client.util.chunk(res, 5);
                const result =   chunk[0].map((a, i) => `*${i + 1}. ${a.title}*\n${a.link.url}`);
                
                await message.replyWithMarkdown(`*Hasil Pencarian*:\n\n${result.join('\n')}\n\n*Penggunaan*:\nSalin URL yang kamu ingin download kemudian jalankan perintah *k!kusonime anime <URL>*\n\n*Contoh:*\nk!kusonime anime ${chunk[0][0].link.url}`);
                fullfill();         

            } catch (err) {
                reject(err);
                message.reply(`Something went wrong:\n${err.message}`);
            }
        })       
    }

    getLink(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {

                const req = await axios.get(`http://localhost:3001/api/anime/${query}`);
                const res = req.data.data;

                //link download
                const dl = res.list_download
                    .map((a) => `*${a[0].replace('Download', '')}*\n${a[1]
                        .map((x) => `${x.resolusi}\n${x.link_download
                            .map((y) => `├ ${y.platform}\n${y.link}`).join('\n')}\n`).join('\n')
                        }`);

                const caption = 
                `*${res.title}*\n*Genre*:${res.genre.map((a) => `${a.name}`).join(', ')}\n*Season*: ${res.season.name}\n*Status*: ${res.status}\n*Durasi*: ${res.durasi}\n*Score*: ${res.score}`

                await message.replyWithPhoto(res.thumbnail, {
                    caption,
                    parse_mode: 'Markdown'
                });

                await message.reply(dl.join('\n'));
                
                fullfill();

            } catch (err) {
                reject(err);
                message.reply(err.message);
            }
        })

    }
};

class Samehadaku {

    constructor(client) {
        this.client = client;
    }

    getBySearch(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {
                
                const req = await axios.get(`https://samehadaku-rest-api.herokuapp.com/search/${query}/1`);
                const res = req.data;
    
                if (res.results.length < 1) return message.reply(`Tidak ditemukan dengan judul ${query}`);
                let chunk = this.client.util.chunk(res.results, 5);
                let result = chunk[0].map((a, i) => `*${i + 1}. ${a.title}*\n${a.link}`);
                message.replyWithMarkdown(`*Hasil Pencarian:*\n${result.join('\n')}\n\n*Penggunaan*:\nSalin URL yang tersedia, kemudian jalankan perintah *k!samehadaku anime <url>*\n\n*Contoh*:\nk!samehadaku anime ${chunk[0][0].link}`);
                fullfill();
                
            } catch (err) {

                reject(err);
                message.reply(`Something went wrong:\n ${err.message}`);

            }
        });
    }

    getAnime(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {

                const req = await axios.get(`https://samehadaku-rest-api.herokuapp.com/anime/${query}`)
                const res = req.data;

                if (res.length < 1) return message.reply(`Tidak ditemukan, Hubungi Developer Secepatnya!`);
                let Eps = res.list_episode.map((a, i) => `*${i + 1}. ${a.title}*\n${a.link}`);
                let caption = `✅ ${res.title}\n├ Genre: ${res.genre.map((a) => `${a.text}`).join(', ')}\n├ Season: ${res.detail.Season}\n├ Status: ${res.detail.Status}\n├ Durasi: ${res.detail.Duration}\n└ Release: ${res.detail.Rilis}`;
                
                await message.replyWithPhoto(res.image.split('?').shift(), { caption });
                await message.replyWithMarkdown(`*List Episode:*\n${Eps.join('\n')}\n\n*Penggunaan:*\nSalin URL yang tersedia, jalankan *k!samehadaku eps <link>*\n\n*Contoh*:\nk!samehadaku eps ${res.list_episode[0].link}`);
                fullfill();

            } catch (err) {
                reject(err);
                message.reply(`Something went wrong:\n${err.message}`);
            }
        });
    }

    getEps(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {

                const req = await axios.get(`https://samehadaku-rest-api.herokuapp.com/anime/eps/${query}`);
                const res = req.data;

                if (res.length < 1) return message.reply(`Tidak ditemukan, Segera laporankan ke Developer!`);
                let link = res.downloadEps.map((a) => `*${a.format}* ${a.data.map((aa) => `*(${aa.quality.trim()})*\nZippyShare:\n${aa.link.zippyshare}\nGoogle Drive:\n${aa.link.gdrive}\n`).join('\n')}\n`).join('\n');

                await message.replyWithMarkdown(`*${res.title}*\n\n${link}`, { disable_web_page_preview: true });
                fullfill();

            } catch (err) {
                reject(err);
                message.reply(`Somehting went wrong: ${err.message}`);
            }
        });
    }
}

module.exports = {Kusonime, Samehadaku};