const {model} = require('mongoose')
const TeamSchema = require('../Schema/Team');

module.exports = model('Team', TeamSchema);
