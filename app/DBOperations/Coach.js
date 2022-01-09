const Coach = require("../Models/Coach");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId;
const Team = require('./Team');


module.exports = {

    create : async payload => {
            let coach = await Coach.findOne({email:payload.email});
            if(coach)
                return coach;
            return await Coach.create(payload);
    },

    makeAuth : async credentials => {
        let coach = await Coach.findOne({email:credentials.email});
        let authenticated = null;
        if (coach && (await bcrypt.compare(credentials.password, coach.password))) {
            // let teams = await Team.find({coach_id:coach._id});
            // teams = teams.map(team => team._id.toString());
            const token = jwt.sign(
                {coach_id:coach._id,email:coach.email,name:coach.name},
                process.env.COACH_TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
            authenticated = {email:coach.email,name:coach.name,token}
        }
        return authenticated;
    },

    findOne : async (search) => {
        if("_id" in search){
            if (!ObjectId.isValid(search._id))
                return null;
            search._id = ObjectId(search._id);     
        }
        return await Coach.findOne(search);
    }

}