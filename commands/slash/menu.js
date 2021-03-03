module.exports = async (client, message) => {

    await message.deleteMessage();

    const cmd = [];
    let cmdlist = Array.from(client.helps);
    cmdlist = cmdlist.filter(a => !a[1].hide);

    cmdlist.forEach( a => {

        cmd.push(a[1].cmds
            .filter(f => f !== 'help')
            .map(x => ( {text: x, callback_data: x} )));
    });

    message.reply('Hai Selamat Datang di Bot TCH....\nPilih sesuai kebutuhan ya!', {
        reply_markup: {
            inline_keyboard: cmd
        }
    });
    
}