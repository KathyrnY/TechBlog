const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    console.log(dbUserData);

    req.session.save(() => {
      req.session.user_id = dbUserData.dataValues.id;
      req.session.username = dbUserData.dataValues.username;
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(400).render({ error: 'Invalid username or password' });
    }

    console.log('password>>>', req.body.password);
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: 'Invalid username or password' });
    }
    // This will save the username and user id in the session
    req.session.username = user.username;
    req.session.user_id = user.dataValues.id;
    req.session.loggedIn = true;

    res.status(200).json({ message: 'You are now logged in!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/logout', (req, res) => {
  console.log('inside logout route');
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;