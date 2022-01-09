const {Schema}  = require('mongoose');
const PlayerMatch  = require('./PlayerMatch');


let schema = new Schema({
    
    name : String,
    team_id : String,
    total_match_played : Number,
    total_match_won : Number,
    total_match_lost : Number,
    total_match_win_per : Number,
    matches_played : PlayerMatch

});

module.exports = schema;