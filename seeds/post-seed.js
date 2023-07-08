const { Post } = require('../models');

const postData = [
    {
        title: 'Object-Relational Mapping',
        content: 'Parley square-rigged loaded to the gunwalls quarter dead men tell no tales brig dance the hempen jig crimp carouser pink.',
        user_id:1,
    },
    {
        title: 'MVC',
        content: 'Lugsail coxswain barque rutters grog blossom swab heave to blow the man down rigging main sheet.',
        user_id:2,
    },
]

const seedPost = async () => {
    try{
        await Post.bulkCreate(postData);
        console.log('Posts seeded successfully!');
    } catch (error) {
        console.log('error with seeding posts', error);
    }
};

module.exports = seedPost;