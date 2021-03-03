const tele = require('telegraf');

exports.run = (client, message, args) => {

    try {

        if(!args[0]) {

            let module = Array.from(client.helps);
            let list = module.map(a => {
                return `*${a[1].name}*\n${a[1].cmds.map(x => `${x}`).join(' | ')}`
            });
            message.replyWithMarkdown(`List Perintah:\n\n${list.join('\n')}\n\n*Penggunaan*:\nk!*<perintah>*\nk!help *[command]*\n\n*Contoh*:\nk!ping\nk!help ping\n\n*[] opsional, <> diwajibkan. • Jangan tambahkan simbol ini ketika mengetik sebuah perintah.*`);

        } else {

            let cmd = args[0];
            if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
                let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                let name = command.help.name;
                let desc = command.help.description;
                let cooldown = command.conf.cooldown;
                let aliases = command.conf.aliases.join(', ') ? command.conf.aliases.join(', ') : 'No aliases provided.';
                let usage = 'k!' + command.help.usage !== undefined ? command.help.usage : "No usage provided.";
                let example = 'k!' + command.help.example !== undefined ? command.help.example : "No example provided."

                return message.replyWithMarkdown(`*Perintah*\`\`\`${name}\`\`\`\n\n*Deskripsi*:\n${desc}\n\n*Aliases*: ${aliases}\n\n*Cooldown*: ${cooldown} detik\n\n*Penggunaan*:\n${usage}\n\n*Contoh*:\n${example}`, { disable_web_page_preview: true });
            }

            if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
                message.reply(`Tidak ditemukan perintah ${args[0]}!`);
            }
        }
    } catch (err) {
        message.reply(`Something went wrong:\n${err.message}`);
    }

};

exports.conf = {
    aliases: [],
    cooldown: 5
}

exports.help = {
    name: 'help',
    description: 'list perintah',
    usage: 'help / k!help [nama perintah]',
    example: 'help / k!help help'
}

