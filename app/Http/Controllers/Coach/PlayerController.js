const Response = new (require('../../../Http/Services/Response'))();
const Team = require("../../../DBOperations/Team");
const Player = require("../../../DBOperations/Player");
const { validationResult, matchedData } = require('express-validator');

module.exports = {

    index : async (req, res, next) => {
        try{
            let search = { team_id: { $in: req.coachuser.teams } };
            let keyword = null
            let limit = null;
            let skip = null;
            if(req.query.q)
                keyword = req.query.q;
            if(req.query.limit)
                limit = req.query.limit
            if(req.query.page && req.query.limit)
                skip = (req.query.page-1)*req.query.limit;
            let players = await Player.findEfficientPlayer(search, keyword, skip, limit);

            return Response.success(res,{data:players,message:"Fetched Players"},200);
        }catch(e){
            return Response.error(res, {data:{}, message:"Server error."}, 500, e);
        }
    },

    create : async (req, res, next) => {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return Response.error(res,{data:{},message:"Validation error.", errors: errors.array()},422);
            }

            let body = matchedData(req);
            let team = await Team.findOne({coach_id:req.coachuser.coach_id,_id:body.team_id});
            if(!team)
                return Response.error(res,{data:{},message:"Team does not exist"},422);
            let payload = body
            let player = await Player.create(payload);

            let resultset = {
                data : player,
                message : "Player Saved!"
            }
            return Response.success(res,resultset,201);
        }catch(e){
            return Response.error(res, {data:{}, message:"Server error."}, 500, e);
        }

    },

    matchPlayed : async (req, res, next) => {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return Response.error(res,{data:{},message:"Validation error.", errors: errors.array()},422);
            }
            let body = matchedData(req);
            let player = await Player.storeMatchPlayed({_id:body.player_id,team_id: { $in: req.coachuser.teams }} , body);
            if(!player)
                return Response.error(res,{data:{},message:"Player does not exist."},404);
            
            return Response.success(res,{data:{},message:"Match added."},201);
        }catch(e){
            return Response.error(res, {data:{}, message:"Server error."}, 500, e);
        }
    }

}