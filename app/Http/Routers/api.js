const router = require('express').Router();
const res = require('express/lib/response');
const coachRoutes = require('./coach');
const adminRoutes = require('./admin');


router.use('/admin', adminRoutes);
router.use('/coach', coachRoutes);


module.exports = router