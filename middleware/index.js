const {verifyToken, isAdmin, isUser} = require('./middleware')

module.exports = {
  verifyToken,
  isAdmin,
  isUser
};
