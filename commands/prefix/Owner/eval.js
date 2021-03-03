const tele = require('telegraf');

exports.run = async (client, message, args) => {
    const msg = message.update.message;
    try {

        if (!client.config.owners.includes(msg.chat.id)) return;

        let codeIn = args.join(' ');    
        let code = eval(codeIn);
    
        if(!codeIn) return;
        if (codeIn.includes('process.env.TOKEN')) {
            code = 'xontol';
        } else {
            code = eval(code);
        }
        
        if (typeof code !== 'string') code = require('util').inspect(code, {depth: 0});
        
        await message.replyWithMarkdown(`\`\`\`javascript\n${code}\n\`\`\``);

    } catch (err) {
        return message.reply(`Something went wrong:\n ${err.message}`);
    }

};

exports.conf = {
    aliases: [],
    cooldown: 1
};

exports.help = {
    name: 'eval',
    description: 'eval',
    example: 'eval',
    usage: 'eval'
};