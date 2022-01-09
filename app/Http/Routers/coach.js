const express = require('express');
const router = express.Router();
const authroutes = express.Router();
const verifyCoach = require('../Middleware/VerifyCoach');
const CoachAuth = require('../Controllers/Coach/CoachAuth');
const PlayerController = require('../Controllers/Coach/PlayerController');
const TeamController = require('../Controllers/Coach/TeamController');
const validations = require("../Validations/rules");

router.post('/login', validations.login_coach, CoachAuth.login);

authroutes.get('/players', PlayerController.index);
authroutes.post('/players', validations.player, PlayerController.create);
authroutes.post('/players/played-matches', validations.store_match, PlayerController.matchPlayed);
authroutes.post('/teams', validations.store_team, TeamController.create);


router.use('/', verifyCoach, authroutes);

module.exports = router