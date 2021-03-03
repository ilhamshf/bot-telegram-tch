const tele = require('telegraf');
const axios = require('axios');

exports.run = async (client, message, args) => {

    let query = args.join(' '); 
    if (!query) return message.reply('masukkan permintaan terlebih dahulu!');

    if (query.startsWith('https')) query = query.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)[1];
    let data = await axios.get(`https://katowo.glitch.me/api/info/${query}`); data = data.data;

    let temp = { default: [], videoOnly: [] };
    for (i = 0; i < data.video.length; i++) temp.default[i] = `${i + 1}. ${data.video[i].qualityLabel}\nhttps://katowo.glitch.me/api/download/${query}/default/${data.video[i].qualityLabel}`;
    for (i = 0; i < data.videoOnly.length; i++) temp.videoOnly[i] = `${i + 1}. ${data.videoOnly[i].qualityLabel}\nhttps://katowo.glitch.me/api/download/${query}/videoOnly/${data.videoOnly[i].qualityLabel}`;
    temp.audioOnly    = `1. ${data.audioOnly.shift().audioQuality}\nhttps://katowo.glitch.me/api/download/${query}/audioOnly/default`;

    const dl = `Video with audio\n${temp.default.join('\n')}\n\nAudio Only\n${temp.audioOnly}\n\nVideo Only\n${temp.videoOnly.join('\n')}`
    const tb = data.info.thumbnail.thumbnails.pop().url.split('?').shift();
    const caption = `YTDL | ${data.info.title}\n\nDurasi: ${client.util.parseDur(data.info.lengthSeconds * 1000)}\nID: ${data.info.videoId}`;
    if (tb.endsWith('.webp')) {

        await message.replyWithAnimation(tb)
        await message.reply(caption);
        await message.reply(dl);

    }  else {

        await message.replyWithPhoto(data.info.thumbnail.thumbnails.pop().url.split('?').shift(), {
            caption
        });
        await message.replyWithMarkdown(message.from, dl);
    }
    
};

exports.conf = {
    cooldown: 5,
    aliases: ['ytdl', 'yt']
};

exports.help = {
    name: 'youtube',
    description: 'download video di youtube',
    usage: 'k!youtube <url/videoId>',
    example: 'k!youtube https://music.youtube.com/watch?v=zPQS55Y3Vds&feature=share'
}