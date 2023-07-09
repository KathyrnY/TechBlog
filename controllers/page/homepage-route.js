const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
                {
                  model: Comment,
                  include: {
                    model: User,
                    attributes: ['username'],
                  },
                },
              ],
              attributes: { exclude: ['updatedAt'] },
              order: [['date_created', 'DESC']],
            });

            const commentData = await Comment.findAll({
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

console.log('commentData:', commentData);
        const comments = commentData.map((comment) => comment.get({ plain: true }));
      const homePage = true;

      res.render('homepage', {
        posts,
        comments,
        loggedIn: req.session.loggedIn,
        homePage,
      });
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error);
    }
});

module.exports = router;