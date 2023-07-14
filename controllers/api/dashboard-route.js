const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/post', withAuth, async (req, res) => {
    try {
        const {title} = req.body;
        const { content } = req.body;
        const newPostData = await Post.create({
            title,
            content,
            post_id: req.params.id,
            user_id: req.session.user_id
    });
    res.status(200).json(newPostData);
} catch (error) {
    console.log(error);
    res
    .status(500)
    .json({ message: 'Internal server error, cannot post comment' });
}
});

router.put('/post/:id', withAuth, async (req, res) => {
    try {
      const { title, content } = req.body;
  
      const updatedPost = await Post.findOne({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      updatedPost.title = title;
      updatedPost.content = content;
      await updatedPost.save();
      console.log('updatedPost', updatedPost);
      res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error, cannot update post' });
    }
  });

  router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
    
        const deletedPost = await Post.destroy({
          where: {
            id: postId,
            user_id: req.session.user_id,
          },
        });
    
        if (!deletedPost) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.status(200).json({ message: 'Post deletion successful!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error, cannot delete post' });
      }
    });
  




module.exports = router;