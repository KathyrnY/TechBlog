const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
            ],
              attributes: { exclude: ['updatedAt'] },
              order: [['date_created', 'DESC']],
            });

        const posts = postData.map((post) => post.get({ plain: true }));

      const homePage = true;

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        homePage,
      });
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error);
    }
});

router.get('/comments/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    const postData = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!postData) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = postData.get({ plain: true });

        const commentData = await Comment.findAll({
          where: { post_id: postId },
          include: [{ model: User }],
          attributes: { exclude: ['updatedAt'] },
          order: [['date_created', 'DESC']],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('comment-page', {
        post,
        comments,
        loggedIn: req.session.loggedIn,
        });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

module.exports = router;