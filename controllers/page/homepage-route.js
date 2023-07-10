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

              console.log('postData:', postData);
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
        const commentData = await Comment.findAll({
          where: { post_id: postId },
          include: [{ model: User }],
          attributes: { exclude: ['updatedAt'] },
          order: [['date_created', 'DESC']],
        });
        console.log('Comment Data:', commentData);
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('comment-page', {
        comments,
        loggedIn: req.session.loggedIn, 
      
        });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  

module.exports = router;