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

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId);
    const post = postData.get({plain: true});
    if (!postData) {
      return res.status(404).json({ message: 'Post not found' });
    }
console.log('Post Data:', post)
    res.render('edit-post', { 
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error, cannot retrieve post' });
  }
});

module.exports = router;
