const Response = new (require('../../../Http/Services/Response'))();
const Coach = require("../../../DBOperations/Coach")
const { validationResult, matchedData } = require('express-validator');

module.exports = {

    login : async (req, res, next) => {
            try{

                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return Response.error(res,{data:{},message:"Validation error.", errors: errors.array()},422);
                }

                let body = matchedData(req);

                let auth = await Coach.makeAuth(body);
                if(auth)
                    return Response.success(res,{data:auth,message:"Successfully logged in."},200);
                    
                return Response.error(res, {data:{}, message:"Invalid credentials."}, 401);
            }catch(e){
                return Response.error(res, {data:{}, message:"Server error."}, 500, e);
            }
            
    }

}