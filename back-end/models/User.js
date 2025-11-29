// models/User.js
// In-memory mock User model for testing login and register

const users = []; // store users here temporarily

module.exports = {
  create: async (data) => {
    const newUser = { _id: Date.now().toString(), ...data };
    users.push(newUser);
    return newUser;
  },
  findOne: async (query) => {
    return users.find(user => user.email === query.email) || null;
  },
};
