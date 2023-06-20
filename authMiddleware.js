// authMiddleware.js

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        req.user_id = req.user._id; // Speichere die Benutzer-ID im Anfrageobjekt
        return next();
      }
      res.redirect('/login');
  }
  
  module.exports = {
    ensureAuthenticated
  };