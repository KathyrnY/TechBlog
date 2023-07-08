const { User } = require('../models');

const userData = [
  {
    first_name: 'Kathy',
    last_name: 'Moore',
    email: 'kathymoore@gmail.com',
    username: 'kathymoore',
    password: 'kathy123',
  },
  {
    first_name: 'Chris',
    last_name: 'Young',
    email: 'chrismoore@gmail.com',
    username: 'chrisyoung',
    password: 'chris123@789',
  },
  {
    first_name: 'Miranda',
    last_name: 'Diaz',
    email: 'mirandadiaz@gmail.com',
    username: 'mirandadiaz',
    password: 'miranda123@90',
  },
];
const seedUser = async () => {
  try {
    await User.bulkCreate(userData);
    console.log('Users were seeded!');
  } catch (error) {
    console.error('Error with seeding users', error);
  }
};

module.exports = seedUser;
