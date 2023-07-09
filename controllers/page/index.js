const router = require('express').Router();

const loginRoute = require('./login-route');
const signupRoute = require('./signup-route');
const dashboardRoutes = require('./dashboard-route');



router.use('/', loginRoute);
router.use('/signup', signupRoute);
router.use('/dashboard', dashboardRoutes);



module.exports = router;
