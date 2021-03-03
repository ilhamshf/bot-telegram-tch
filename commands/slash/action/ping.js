module.exports = async (client, message) => {
  try {
    
    await message.deleteMessage();
    const msg = message.update.callback_query.message;
    message.replyWithMarkdown("Hai there!\nLatensi: *" + client.util.ping(msg.date, Date.now()) + "ms*");
    
  } catch (err) {

    message.replyWithMarkdown(`*Sepertinya terjadi kesalahan*:\n${err.message}`)

  }
  
};
