const {model}   = require('mongoose');
const AdminSchema = require('../Schema/Admin');


module.exports = model('Admin', AdminSchema);