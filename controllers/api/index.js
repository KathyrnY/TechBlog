const router = require('express').Router();
const homePageRoutes = require('./homePageRoutes');

router.use('/users', homePageRoutes);

module.exports = router;