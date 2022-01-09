const Response = new (require('../../../Http/Services/Response'))();
const Player = require("../../../DBOperations/Player");


module.exports = {

    index : async (req, res, next) => {
        try{
            let search = {};
            let keyword = null;
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

}