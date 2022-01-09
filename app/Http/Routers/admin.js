const express = require('express');
const router = express.Router();
const authroutes = express.Router();
const VerifyAdmin = require('../Middleware/VerifyAdmin');
const AdminAuth = require('../Controllers/Admin/AdminAuth');
const PlayerController = require('../Controllers/Admin/PlayerController');
const TeamController = require('../Controllers/Admin/TeamController');
const CoachController = require('../Controllers/Admin/CoachController');
const validations = require("../Validations/rules");

router.post('/login', validations.login_admin, AdminAuth.login);
authroutes.post('/coaches', validations.store_coach_admin, CoachController.create);
authroutes.post('/teams', validations.store_team_admin, TeamController.create);
authroutes.get('/players', PlayerController.index);

router.use('/', VerifyAdmin, authroutes);


module.exports = router