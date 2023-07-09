const router = require('express').Router();

const loginRoute = require('./login-route');
const signupRoute = require('./signup-route');
const dashboardRoutes = require('./dashboard-route');
const homePageRoute = require('./homepage-route');

router.use('/', loginRoute);
router.use('/signup', signupRoute);
router.use('/dashboard', dashboardRoutes);
router.use('/homepage', homePageRoute );

module.exports = router;
