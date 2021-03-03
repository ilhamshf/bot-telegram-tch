const { readdirSync } = require("fs");

module.exports = client => {
  
  const cmds = readdirSync("./commands/slash/");
  for (let cmd of cmds) {
    if (!cmd.endsWith('.js')) continue;
    const file = require(`../commands/slash/${cmd}`);
    client.command(cmd.split('.')[0], (...args) => file(client, ...args));
  
  }
  
  const events = readdirSync("./events/");
  for (let event of events) {
    const file = require(`../events/${event}`);
    client.on(event.split(".")[0], (...args) => file(client, ...args));
  }
  
  const actions = readdirSync('./commands/slash/action/');
  for (let action of actions) {
    const file = require(`../commands/slash/action/${action}`);
    client.action(action.split('.')[0], (...args) => file(client, ...args));
  }

}