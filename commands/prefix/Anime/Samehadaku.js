const tele = require('telegraf');

exports.run = async (client, message, args) => {

    try {

        if (!args[0]) return message.replyWithMarkdown(`Case Perintah:\n\n*search*\n*anime*\n*eps*\n\n*Penggunaan*:\n${client.config.prefix[0]}samehadaku anime`);

        switch (args[0].toLowerCase()) {
            case 'anime':
                if(!args[1]) return message.replyWithMarkdown(`Masukin Linknya dulu!\n*Penggunaan*:\n${client.config.prefix[0]}same anime <endpointURL>\n\n*Contoh*:\n${client.config.prefix[0]}same anime https://samehadaku.vip/anime/kanojo-okarishimasu/`);
                let link = args[1].includes('https') ? args[1].replace('https://samehadaku.vip/anime/', '') : args[1];
                await client.samehadaku.getAnime(message, link);
            break;

            case 'search':
                if(!args[1]) return message.reply(`Masukkan judul dulu!\n*Penggunaan*:\n${client.config.prefix[0]}same search <title>\n\n*Contoh*:\nk`);
                args.shift();

                console.log(args);

                await client.samehadaku.getBySearch(message, args.join('%20'));
            break;

            case 'eps':
                if(!args[1]) return message.reply(`Masukin URL epsnya!\n*Penggunaan*:\n${client.config.prefix[0]}same eps <urlEndpoint>\n\n*Contoh*:\nk!same eps https://samehadaku.vip/kanojo-okarishimasu-episode-12-end/`);
                let eps = args[1].includes('https') ? args[1].replace('https://samehadaku.vip/', '') : args[1];

                await client.samehadaku.getEps(message, eps);
            break;

            default:
                message.reply(`Tidak ada Perintah Case *${args[0]}*`);
            break;
        }

    } catch (err) {
        return message.reply(`Something went wrong:\n ${err.message}`);
    }

};

exports.conf = {
    aliases: ['same', 'samehada'],
    cooldown: 30
};

exports.help = {
    name: 'samehadaku',
    description: 'samehadaku',
    usage: 'k!samehadaku <search/anime/eps> <judul/urlEndpoint/urlEndpoint>',
    example: 'k!samehadaku search kanojo\nk!samehadaku anime https://samehadaku.vip/anime/kanojo-okarishimasu/\nk!samehadaku eps https://samehadaku.vip/kanojo-okarishimasu-episode-12-end/'
};