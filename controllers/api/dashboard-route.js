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
    })




module.exports = router;