const tele = require('telegraf');
cooldowns = new Map();
db = require('quick.db');   

module.exports = async (client, message) => {

    const msg = message.update.message;

    let prefix;
    if (msg.text.toLowerCase().startsWith(client.config.prefix[0])) {
    prefix = client.config.prefix[0]; // Cek folder, config.json.
    } else if (msg.text.toLowerCase().startsWith(client.config.prefix[1])) {
    prefix = client.config.prefix[1];
    }
    // require('../plugin/ar.js')(client, msg)
    // require('../plugin/afk.js')(client, msg)
    
    //Prefix nya bisa antara di mention, ama antara pake prefix biasa (k!)
    
    if (!msg.text.toLowerCase().startsWith(prefix)) return;
    
    let args = msg.text.slice(prefix.length).trim().split(/ +/g);
    let content = msg.text.toLowerCase();
    let cmd = args.shift().toLowerCase();
    let sender = msg.chat;
    
    msg.flags = [];
    while (args[0] && args[0][0] === "-") {
    msg.flags.push(args.shift().slice(1));
    } // Ini tuh ibaratkan parameter.
    
    
    
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;
    if (!cooldowns.has(commandFile.help.name)) {
    cooldowns.set(commandFile.help.name, new Map());
    }
    
    
    const member = msg.chat;
    const now = Date.now();
    const timestamps = cooldowns.get(commandFile.help.name);
    const cooldownAmount = (commandFile.conf.cooldown || 3) * 1000
    
    if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(msg.chat.id)) {
      timestamps.set(member.id, now);
    }
    } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
    if (now < expirationTime) {
    
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Tenang, tunggu **${timeLeft.toFixed(1)}** detik baru bisa dipakai kembali.`);
      // Bisa diubah teks nya, kalo misalnya user nya lagi cooldown.
    }
    
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }
    
    
    
    try {
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd)); // Jalani command dengan aliases juga bisa. Misalnya: k!serverinfo, k!server, k!s
    command.run(client, message, args);
    } catch (e) {
    console.log(e.msg);
    } finally {
      console.log(`${sender.username ? sender.username : sender.first_name} (${sender.id}) ran ${cmd}`); // Mengetahui, siapa aja yang make command (cuman di console log aja kok)
    }

}