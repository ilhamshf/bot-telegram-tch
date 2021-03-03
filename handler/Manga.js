const axios = require('axios');
const API = require('mangadex-full-api');
const configDex = require('../config.json').mangadex;

class Manga {
    constructor(client) {
        this.client = client;
        this.account = API.agent.login(configDex.username, configDex.password, true);
    }

    komikuSearch(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {
                
                const req = await axios.get(`https://mangamint.kaedenoki.net/api/search/${query}`);
                let res = req.data;
                if (res.length < 1) return message.reply(`Pencarian Judul ${query} tidak ditemukan!`);
                res = res.manga_list;
    
                const mangaList = res.map((a, i) => `*${i + 1}. ${a.title}*\n${'https://komiku.id/manga/' + a.endpoint}`);
                const chunkList = this.client.util.chunk(mangaList, 10)[0];
                await message.replyWithMarkdown(`*Hasil Pencarian*:\n\n${chunkList.join('\n')}\n\n*Penggunaan*:\ncopas URL yang tersedia, kemudian jalankan perintah *k!komiku manga <URL>*\n\n*Contoh*:\nk!komiku manga https://komiku.id/manga/${res[0].endpoint}`, { disable_web_page_preview: true });
    
                fullfill();

            } catch (err) {
                reject(err);
                return message.reply(`Something went wrong:\n${err.message}`);
            }

        }) 
    } 

    komikuManga(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {

                const req = await axios.get(`https://mangamint.kaedenoki.net/api/manga/detail/${query}`);
                const res = req.data;
                if (res.length < 1) return message.reply(message.from, `Terjadi kesalahan pada API, silahkan laporkan ke Developer!`);

                const mapChap = res.chapter.map((a, i) => `*${i + 1}. ${a.chapter_title}*\n${'https://mangadl-katow.herokuapp.com/download/komiku/' + a.chapter_endpoint}zip`);
                const chapterList = this.client.util.chunk(mapChap, 15);
                
                let about = `*${res.type} | ${res.title}*\n\n*Author*: ${res.author}\n*Status*: ${res.status}\n*Genre*: ${res.genre_list.map(a => a.genre_name).join(', ')}\n\n*Penggunaan*:\nKlik URL untuk mendownload manga dengan format zip!`
                
                 await message.replyWithPhoto(res.thumb.split('?').shift(), { caption: about, parse_mode: 'Markdown' });

                 if (mapChap.length > 20) {
                     await message.reply(`*Chapter List | ${res.title}*\n\n${chapterList.shift().join('\n')}}`);
                     const sendAgain = async (array, i = 0) => {
                         setTimeout(() => {
                             if (!array[i]) return;
                              message.replyWithMarkdown(array[i].join('\n'));
                             i++;
                             sendAgain(array, i);
                         }, 1500);
                     }

                     sendAgain(chapterList);

                } else {
                    await message.reply(`*Chapter List | ${res.title}*\n\n${chapterList.join('\n')}}`);
                };

                fullfill();
                
            } catch(err) {
                reject(err);
                return message.reply(`Something went wrong:\n${err.message}`);
            }
        })
    }

    mangadexSearch(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {
                await this.account;
    
                const lang = query.shift();
                const req = query.join(' ');
    
                const manga = new API.Manga();
                const data = await manga.fillByQuery(req);
                if (!data) return message.reply(`Manga Not Found!`);
    
                const filterLang = manga.chapters.filter(a => a.language === lang);
                if (filterLang.length < 1) return message.replyWithMarkdown(`Tidak ditemukan dengan Manga Bahasa *${lang}*`);
                const mapChap = filterLang.map((a, i) => `*${i + 1}. Chapter ${a.chapter} (${a.id})*\nhttps://mangadl-katow.herokuapp.com/download/mangadex/${a.id}/zip`);
                
                
    
                await message.replyWithPhoto('https://mangadex.org' + data.cover, { 
                    caption: `${data.title} | *${data.hentai ? 'Hentai' : 'Not Hentai'}*\n\n*Artist & Author*: ${data.authors}\n*Rating*: 🌟${data.rating}\n*ID*: ${data.id}\n*Language*: ${lang}\n\n*Penggunaan*:\nklik *URL* yang tersedia untuk mendownload!`,
                    parse_mode: 'Markdown'
                });
                
    
                if (mapChap.length > 20) {
                    await message.replyWithMarkdown(`*Chapter List | ${data.title}*\n\n${chapterList.shift().join('\n')}}`);
                    const sendAgain = async (array, i = 0) => {
                        setTimeout(() => {
                            if (!array[i]) return;
                             message.replyWithMarkdown(array[i].join('\n'));
                            i++;
                            sendAgain(array, i);
                        }, 1500);
                    }
    
                    sendAgain(chapterList);
    
               } else {
                 message.reply(`*Chapter List | ${data.title}*\n\n${chapterList.join('\n')}}`);
               };
    
                fullfill();

            } catch(err) {
                reject(err);
                return message.reply(`Something went wrong:\n${err.message}`);
            }
        })
    }

    mangadexID(message, query) {
        return new Promise(async (fullfill, reject) => {
            try {
                
                await this.account;
    
                const lang = query[0];
                const req = query[1];
    
                const manga = new API.Manga();
                const data = await manga.fill(req);
                if (!data) return message.reply(`Manga Not Found!`);

                const filterLang = manga.chapters.filter(a => a.language === lang);
                if (filterLang.length < 1) return message.reply( `Tidak ditemukan dengan Manga Bahasa ${lang}`);
                const mapChap = filterLang.map((a, i) => `*${i + 1}. Chapter ${a.chapter} (${a.id})*\nhttps://mangadl-katow.herokuapp.com/download/mangadex/${a.id}/zip`);
                const chapterList = this.client.util.chunk(mapChap, 15);
                
                await message.replyWithPhoto('https://mangadex.org' + data.cover,{
                    caption: `${data.title} | *${data.hentai ? 'Hentai' : 'Not Hentai'}*\n\n*Artist & Author*: ${data.authors}\n*Rating*: 🌟${data.rating}\n*ID*: ${data.id}\n*Language*: ${lang}\n\n*Penggunaan*:\nklik *URL* yang tersedia untuk mendownload!`,
                    parse_mode: 'Markdown'
                });

                if (mapChap.length > 20) {

                    await message.replyWithMarkdown(`*Chapter List | ${data.title}*\n\n${chapterList.shift().join('\n')}}`);
                    const sendAgain = async (array, i = 0) => {
                        setTimeout(() => {
                            if (!array[i]) return;
                             message.replyWithMarkdown(array[i].join('\n'));
                            i++;
                            sendAgain(array, i);
                        }, 1500);
                    }
    
                    sendAgain(chapterList);
    
               } else {
                 message.reply(`*Chapter List | ${data.title}*\n\n${chapterList.join('\n')}}`);
               };
    
                fullfill();

            } catch(err) {
                reject(err);
                return message.reply(message.from, `Something went wrong:\n${err.message}`);
            }
        })
    }
}

module.exports = Manga;