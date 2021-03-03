const tele = require('telegraf');

exports.run = async (client, message, args) => {

    try {

        if(!args[0]) return message.replyWithMarkdown(`Case Perintah:\n\n*search*\n*anime*\n\n*Penggunaan*:\n${client.config.prefix[0]}kusonime <case perintah>\n\n*Contoh*:\nk!kusonime search`);
        switch (args[0]) {
            case 'anime':
                if(!args[1]) return message.replyWithMarkdown(`*Penggunaan*:\nk!kusonime anime <urlEndpoint>\n\n*Contoh*:\nk!kusonime anime https://kusonime.com/toradora-bd-batch-subtitle-indonesia/`);
                let link = args[1].includes('https') ? args[1].replace('https://kusonime.com/', '') : args[1];
                await client.kusonime.getLink(message, link);
            break;

            case 'search':
                if(!args[1]) return message.replyWithMarkdown(`*Penggunaan*:\nk!kusonime search <title>\n\n*Contoh*:\nk!kusonime search kanojo okarishimasu`);
                args.shift();

                await client.kusonime.getBySearch(message, args.join(' '));
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
    aliases: ['kuso', 'kusoni'],
    cooldown: 30
};

exports.help = {
    name: 'kusonime',
    description: 'kusonime',
    usage: 'k!kusonime <search/anime> <judul/urlEndpoint>',
    example: 'k!kusonime search kanojo\nk!kusonime anime https://kusonime.com/toradora-bd-batch-subtitle-indonesia'
};