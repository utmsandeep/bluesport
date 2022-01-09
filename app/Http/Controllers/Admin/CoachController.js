const Response = new (require('../../../Http/Services/Response'))();
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
            let coach = await Coach.create(body);

            return Response.success(res,{data:coach,message:"Coach Saved"},201);
        }catch(e){
            return Response.error(res, {data:{}, message:"Server error."}, 500, e);
        }

    }

}