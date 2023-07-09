const router = require('express').Router();
const { User, Post, } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      attributes: { exclude: ['updatedAt'] },
      order: [['date_created', 'DESC']],
    });

    if (!userPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    console.log('>>>>>>Post Data<<<<<<<<:', userPostData);
    const posts = userPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
     loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
