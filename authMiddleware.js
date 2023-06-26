require('dotenv').config();

// authMiddleware.js

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        req.user_id = req.user._id;
        return next();
      }
      res.sendStatus(401);
  }
  
  module.exports = {
    ensureAuthenticated
  };