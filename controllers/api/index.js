const router = require('express').Router();
const homePageRoutes = require('./homePageRoutes');
const commentRoute = require('./comment-route');

router.use('/users', homePageRoutes);
router.use('/homepage', commentRoute);

module.exports = router;