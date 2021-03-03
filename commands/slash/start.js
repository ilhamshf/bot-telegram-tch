module.exports = async (client, ctx) => {

    ctx.replyWithAnimation('https://biteable.com/content/uploads/2017/09/videogif2.gif', { 
        reply_markup: {
            inline_keyboard: [[{text: 'Inline', callback_data: 'inline'}], [{text: 'Prefix', callback_data: 'prefix'}]]
        },
        caption: 'Hai Selamat datang di Bot TCH! (@TCHTeleBot) ❤\n\nBot TCH memiliki dua cara untuk menggunakan fitur-fitur yang ada di Platform ini.\n\nSilahkan klik tombol yang tersedia untuk melihat secara detail!\n\nAda Masalah pada bot? silahkan laporkan ke Developer Bot TCH!\nhttps://instagram.com/ilham.shff\nhttps://discord.gg/6HX4zb8',
        disable_web_page_preview: true
    });
    
    console.log(`${ctx.message.from.username}(${ctx.message.from.id}) ran start`);
}