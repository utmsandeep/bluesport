const jwt = require("jsonwebtoken");
const Response = new (require('../Services/Response'))();

const verify = (req, res, next) => {

    const token = req.headers["x-access-token"];

    if (!token) {
        return Response.error(res, {data:{}, message:"A token is required for authentication."}, 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.ADMIN_TOKEN_KEY);
        req.adminuser = decoded;
    } catch (err) {
        return Response.error(res, {data:{}, message:"Invalid token."}, 401);
    }
    return next();

}

module.exports = verify;