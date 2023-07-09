const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth');
const dateHelper = require('../../utils/helper');

router.get('/', withAuth, async (req, res) => {
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
        const posts = postData.map((post) => {
            const formattedPost = post.get({ plain: true });
            formattedPost.date_created = dateHelper.formatDate(formattedPost.date_created);

            return formattedPost;
        });
      const homePage = true;

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        homePage,
      });
    } catch (error) {
        res.status(500).send('Internal Server Error', error);
    }
});

module.exports = router;