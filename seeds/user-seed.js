const bcrypt = require('bcrypt');
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
    password: '$2b$10$W1QNRIqezI.6BceIjPhAwukOAWUgGwqPc3dbrGs54nqOS0XDiKaCO',
  },
  {
    first_name: 'Miranda',
    last_name: 'Diaz',
    email: 'mirandadiaz@gmail.com',
    username: 'mirandadiaz',
    password: '$2b$10$jnH/RGbtdDtiUfYhu75F2enL1l.DnpEnM/h6ZjgkD/4Oa3MdiJvZ6',
  },
];
const seedUser = async () => {
  try {
    const hashedUserData = await Promise.all(userData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
      };
    }));

    await User.bulkCreate(hashedUserData);
    console.log('Users were seeded!');
  } catch (error) {
    console.error('Error with seeding users', error);
  }
};


module.exports = seedUser;
