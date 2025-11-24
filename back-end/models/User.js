// Temporary mock User model until MongoDB is connected
// Wrote this to prevent the backend crash for following error message: TypeError: 'argument handler must be a function'

module.exports = {
  create: async (data) => {
    return {
      _id: Date.now().toString(),
      ...data,
    };
  },
  findOne: async (query) => {
    return null; // Always "not found" until DB is added
  },
};
