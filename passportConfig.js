const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport){
    passport.use(new localStrategy( async (username, password, done)=>{
        try{
            const user = await User.findOne({username: username})
            if(user == null){
                return done(null, false)
            }
            try{
                 bcrypt.compare(password, user.password, (err, result)=>{
                    if(result===true){
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            } catch (err){
                throw(err)
            }
        } catch (err){
            throw (err)
        }
    }))

    passport.serializeUser((user, cb)=>{
        cb(null, user.id);
    })

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id})
            .then(user => {
                cb(null, user);
            })
            .catch(err => {
                cb(err, null);
            });
    });
    
}