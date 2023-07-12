const router = require('express').Router();
const { User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/comments/:id', withAuth, async (req, res) => {
    try {
      const { content } = req.body;
  
      const newComment = await Comment.create({
        content,
        post_id: req.params.id,
        user_id: req.session.user_id
      });
      const commentWithUser = await Comment.findByPk(newComment.id, {
        include: {
          model: User,
          attributes: ['username'],
        },
      });
  console.log('User info:', commentWithUser);
  res.status(200).json(commentWithUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Internal server error, cannot post comment' });
    }
  });
  module.exports = router;