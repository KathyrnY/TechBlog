const sequelize = require('../config/connection');
const seedUser = require('./user-seed');
const seedPost = require('./post-seed');
const seedComment = require('./comment-seed');


const seedAll = async () => {
  await sequelize.sync({
    force: true,
  });
  console.log('DB Synced');

  await seedUser();
  console.log('Seeded Users');

  await seedPost();
  console.log('Seeded Posts');
  
  await seedComment();
  console.log("Seed Comments");
};
seedAll();
