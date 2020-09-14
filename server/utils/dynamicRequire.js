const path = require('path');
const { readdirSync } = require('fs');

module.exports = (dir) => {
  const base = path.join(__dirname, '..', dir);
  try {
    return readdirSync(base)
      .map((file) => path.join(base, file));
  } catch (e) {
    return [];
  }
};
