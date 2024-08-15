const blacklist = new Set(); // This is an in-memory blacklist. Use Redis or another store in production.

const addToBlacklist = (token) => {
  blacklist.add(token);
};

const isBlacklisted = (token) => {
  return blacklist.has(token);
};

module.exports = { addToBlacklist, isBlacklisted };
