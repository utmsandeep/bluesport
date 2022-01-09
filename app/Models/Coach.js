const {model}   = require('mongoose');
const CoachSchema = require('../Schema/Coach');


module.exports = model('Coach', CoachSchema);
