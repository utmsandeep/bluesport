const Response = new (require('../../../Http/Services/Response'))();
const Team = require("../../../DBOperations/Team");
const Coach = require("../../../DBOperations/Coach");
const { validationResult, matchedData } = require('express-validator');


module.exports = {

    create : async (req, res, next) => {

        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return Response.error(res,{data:{},message:"Validation error.", errors: errors.array()},422);
            }

            let body = matchedData(req);
            let coach = await Coach.findOne({_id:body.coach_id});
            if(!coach)
                return Response.error(res,{data:{},message:"Coach does not exist.", errors: errors.array()},422);
            let payload = body
            let team = await Team.create(payload);

            return Response.success(res,{data:team,message:"Team Saved"},201);
        }catch(e){
            return Response.error(res, {data:{}, message:"Server error."}, 500, e);
        }

    }

}