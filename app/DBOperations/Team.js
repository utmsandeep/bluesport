const Team = require('../Models/Team');
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {

    create : async payload => {

        return await Team.create(payload);

    },

    updateOne : async (search , updateable) => {

        let team = await Team.updateOne(search,updateable);
        if(team)
            return team;
        return await Team.create(payload);
    },

    findOne : async (search) => {
        if("_id" in search){
            if (!ObjectId.isValid(search._id))
                return null;
            search._id = ObjectId(search._id);     
        }
        return await Team.findOne(search);
    },

    find : async (search) => {
        if("_id" in search){
            if (!ObjectId.isValid(search._id))
                return null;
            search._id = ObjectId(search._id);     
        }
        return await Team.find(search);
    }

}