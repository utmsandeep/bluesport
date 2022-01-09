const {model}   = require('mongoose');
const PlayerSchema = require('../Schema/Player');


module.exports = model('Player', PlayerSchema);
