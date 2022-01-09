const Response = new (require('../../../Http/Services/Response'))();
const Team = require("../../../DBOperations/Team");
const { validationResult, matchedData } = require('express-validator');

module.exports = {

    create : async (req, res, next) => {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return Response.error(res,{data:{},message:"Validation error.", errors: errors.array()},422);
            }
    
            let payload = { ...matchedData(req), ...{coach_id:req.coachuser.coach_id}};
            let player = await Team.create(payload);

            let resultset = {
                data : player,
                message : "Team Saved!"
            }
            return Response.success(res,resultset,201);
        }catch(e){
            return Response.error(res, {data:{}, message:"Server error."}, 500, e);
        }

    }

}