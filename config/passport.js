const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const OPTIONS = {
  usernameField: 'email',
  passwordField: 'password',
};

const localStrategy = new LocalStrategy(OPTIONS, local);

passport.use(localStrategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

function serialize(user, cb) {
  cb(null, user.id);
}

async function deserialize(id, cb) {
  try {
    const user = await User.findOne({id});

    if (!user) {
      return cb(true);
    }

    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
}

async function local(email, password, cb) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return cb(true);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return cb(true);
    }

    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
}
