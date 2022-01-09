const {Schema}  = require('mongoose');

const schema = new Schema({
    
    match_name : String,
    player_id : String,
    is_won : Boolean,

});

module.exports = schema;