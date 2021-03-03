const tele = require('telegraf');
const Kato = require('./handler/ClientBuilder');
const config = require('./config.json');

const client = new Kato(config.token, { polling: true });

require('./handler/eventCommandAction')(client);
require('./handler/module')(client);

client.package = require('./package.json');


process.on("unhandledRejection", (reason, promise) => {

    console.error("Unhandled Rejection at:", reason.stack || reason);
    console.error(reason);

})
  
process.on("uncaughtException", err => {

    console.error(new Date());
    console.error(`Caught exception: ${err}`);
    console.error(err);
    if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      console.error("true");
    }

})


client.launch().then(() => console.log('Bot telah tersambung!'));