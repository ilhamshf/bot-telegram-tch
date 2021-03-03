const { Telegraf } = require('telegraf');
const Util = require('./util');
const Manga = require('./Manga');
const { Kusonime, Samehadaku } = require('./Anime');

module.exports = class Kato extends Telegraf {
    
    constructor(token, opt) {
        super(token, opt);
        
        this.config = require('../config.json');
        this.util = new Util();
        this.manga = new Manga(this);
        this.kusonime = new Kusonime(this);
        this.samehadaku = new Samehadaku(this);

    }
}