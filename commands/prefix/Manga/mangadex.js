const tele = require('telegraf');
const { lang } = require('./lang.json');

exports.run = async (client, message, args) => {

    if (!args[0]) return message.reply(`Case Perintah:\n*search*\n*id*\n\n*Contoh*:\n\`\`\`k!mangadex search <lang> <judul>\`\`\``);
    
    switch (args[0]) {

        case 'search': 
            args.shift();


            if (!lang.includes(args[0])) return message.replyWithMarkdown(`Masukin bahasanya dulu!\n\n*List Bahasa*:\n${lang.join(' | ')}\n\n*Penggunaan*: \`\`\`k!mangadex search <lang> <judul>\`\`\`*Contoh*: \`\`\`k!mangadex search ID Kanojo okarishimasu\`\`\``);
            if (!args[1]) return message.replyWithMarkdown( `Masukin Judulnya!\n*Contoh*:\nk!mangadex search ID Kanojo Okarishimasu`);

            await client.manga.mangadexSearch(message, args);

        break;

        case 'id':
            args.shift();

            if (!lang.includes(args[0])) return message.reply(message.from, `Masukin bahasanya dulu!\n\n*List Bahasa*:\n${lang.join(' | ')}\n\n*Penggunaan*: \`\`\`k!mangadex id <mangaID>\`\`\`*Contoh*: \`\`\`k!mangadex id GB Kanojo okarishimasu\`\`\``);
            if (!args[1]) return message.reply(`Masukin ID Manga-nya dulu\n*Contoh*: k!mangadex id GB 34144`);   
            await client.manga.mangadexID(message, args);

        break;

        default:
            message.replyWithMarkdown('case yang kamu minta, tidak tersedia di sini silahkan cek case perintah dengan menjalankan *k!mangadex*');
        break;
            
    };





};

exports.conf = {
    aliases: ['manga', 'mangade'],
    cooldown: 5
};

exports.help = {
    name: 'mangadex',
    description: 'mangadex downloader',
    usage: 'k!mangadex <search/id> <language> <title/mangaID>',
    example: 'k!mangadex search GB kanojo okarishimasu\nk!mangadex id GB 31334'
}