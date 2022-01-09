const Player = require('../Models/Player');
var ObjectId = require('mongoose').Types.ObjectId; 


module.exports = {

    create : async payload => {

        return await Player.create(payload);

    },

    storeMatchPlayed : async (search , match) => {
        if("_id" in search){
            if (!ObjectId.isValid(search._id))
                return null;
            search._id = ObjectId(search._id);
        }
        
        let updateable = {$push : {"matches_played":match}};
        let incrementable = { total_match_played : 1 }
        if(match.is_won){
            incrementable = {...incrementable, ...{ total_match_won : 1 }}; 
        }else{
            incrementable = {...incrementable, ...{ total_match_lost : 1 }}; 
        }
        updateable = {...updateable, ...{$inc : incrementable}}
        let player = await Player.findOneAndUpdate(search, updateable, {new:true});
        if(player){
            let total_match_win_per = (player.total_match_won*100)/player.total_match_played;
            total_match_win_per = Math.round((total_match_win_per + Number.EPSILON) * 100) / 100;
            player = await Player.findOneAndUpdate(search,{total_match_win_per},{new:true});
        }

        return player;
    },

    findEfficientPlayer : async (search={}, keyword=null, skip=null, limit=null) => {
        if(keyword)
            search = {...search, ...{ $or : [ {name: {$regex: '.*' + keyword + '.*', $options: 'i' } } , { 'matches_played.match_name': {$regex: '.*' + keyword + '.*', $options: 'i' } } ]} }
        let players = await Player.find(search).sort({total_match_win_per : -1}).skip(skip).limit(limit);

        return players;
    }

}