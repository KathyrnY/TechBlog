const router = require('express').Router();
const homePageRoutes = require('./homePageRoutes');
const commentRoute = require('./comment-route');
const dashboardRoute = require('./dashboard-route');

router.use('/users', homePageRoutes);
router.use('/homepage', commentRoute);
router.use('/dashboard',dashboardRoute);

module.exports = router;