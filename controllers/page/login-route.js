const router = require('express').Router();

router.get('/', (req, res) => {
    try {
      res.render('login');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;