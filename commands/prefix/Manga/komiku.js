const tele = require('telegraf');

exports.run = async (client, message, args) => {

    if (!args[0]) return message.replyWithMarkdown('Case perintah:\n*search*\n*manga*\n\n*Contoh*:\n\`k!komiku search kanojo\`');

    switch(args[0]) {
        
        case 'search':
            args.shift();

            if (!args[0]) return message.reply(`Masukin judulnya dulu!`);
            await client.manga.komikuSearch(message, args.join('%20'));
        
        break;

        case 'manga':
            args.shift();

            if (!args[0]) return message.reply(`Masukin *URL*-nya dulu!`);
            const argsURL = args[0].includes('https') ? args[0].replace('https://komiku.id/manga/', '') : args[0];

            await client.manga.komikuManga(message, argsURL);

        break;

        default:
            message.reply(`Case yang kamu tulis tidak tersedia di perintah ini, silahkan ketik *k!komiku* untuk lebih jelasnya!`);
        break;

    }


}

exports.conf = {
    aliases: ['komi', 'komik'],
    cooldown: 5
}

exports.help = {
    name: 'komiku',
    description: 'Download manga format ZIP',
    usage: `k!komiku <search/manga> <query/urlEndpoint>`,
    example: `k!komiku search kanojo\nk!komiku manga https://komiku.id/manga/ikenai-kanojo-no-otetsudai/`
}