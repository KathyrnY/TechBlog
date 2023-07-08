const { Comment } = require('../models')

commentData = [
    {
        content: 'Clap of thunder landlubber or just lubber bowsprit shrouds bounty mizzen wench killick Jolly Roger keelhaul.',
        user_id: 1,
        post_id: 1,
    },
    {
        content: 'Lugger dead men tell no tales handsomely brig poop deck tack Arr salmagundi Sink me topgallant bilge rat lee sheet hearties jolly boat long clothes lanyard belay no prey.',
        user_id: 2,
        post_id: 2,
    },
]

const seedComment = async () => {
    try {
        await Comment.bulkCreate(commentData);
        console.log('Comments seeded successfully!');
    } catch (error) {
        console.log('Error with seeding comments', error);
    }
};

module.exports = seedComment;