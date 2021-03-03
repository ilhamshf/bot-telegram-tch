const fs = require("fs");

module.exports = client => {
  client.commands = new Map();
  client.aliases = new Map();
  client.helps = new Map();

  fs.readdir("./commands/prefix", (err, categories) => {
    if (err) console.log(err);
    console.log(`Ditemukan ${categories.length} folder kategori.`);
    categories.forEach(category => {
      let moduleConf = require(`../commands/prefix/${category}/module.json`);
      moduleConf.path = `./commands/prefix/${category}`;
      moduleConf.cmds = [];
      client.helps.set(category, moduleConf);
      if (!moduleConf) return;
      fs.readdir(`./commands/prefix/${category}`, (err, files) => {
        console.log(
          `Ditemukan ${files.length - 1} perintah dari folder ${category}.`
        );
        if (err) console.log(err);
        let commands = new Array();
        files.forEach(file => {
          if (!file.endsWith(".js")) return;
          let prop = require(`../commands/prefix/${category}/${file}`);
          let cmdName = file.split(".")[0];
          client.commands.set(prop.help.name, prop);
          prop.conf.aliases.forEach(alias => {
            client.aliases.set(alias, prop.help.name);
          });
          client.helps.get(category).cmds.push(prop.help.name);
        });
      });
    });
  });
};