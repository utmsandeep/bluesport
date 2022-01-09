const jwt = require("jsonwebtoken");
const Response = new (require('../Services/Response'))();
const Team = require('../../Models/Team');

const verify = async (req, res, next) => {

    const token = req.headers["x-access-token"];

    if (!token) {
        return Response.error(res, {data:{}, message:"A token is required for authentication."}, 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.COACH_TOKEN_KEY);
        req.coachuser = decoded;
        let teams = await Team.find({coach_id:decoded.coach_id});
        teams = teams.map(team => team._id.toString());
        req.coachuser.teams = teams
    } catch (err) {
        return Response.error(res, {data:{}, message:"Invalid token."}, 401);
    }
    return next();

}

module.exports = verify;