const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env
const User = require('../../models/User')

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, other, profile, done) {
    User.findOne({ googleId: profile.id })
      .then((currentUser) => {
        if(currentUser){
          //if we already have a record with the given profile ID
          done(null, currentUser);
        } else{
            //if not, create a new user
          new User({
            googleId: profile.id,
            google: { accessToken, refreshToken, profile, other }
          })
          .save()
          .then((newUser) =>{
            done(null, newUser);
          });
        }
      })
      .catch(err => done(err, {}))

  }
));
