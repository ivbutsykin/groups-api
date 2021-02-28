const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt');

const JWT_SECRET = '4883f3aac7dd41dc128ae57bb784af4b';

const OPTIONS = {
  usernameField: 'email',
  passwordField: 'password',
};

const localStrategy = new LocalStrategy(OPTIONS, local);
const jwtStrategy = new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  ignoreExpiration: false,
}, jwt);

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

module.exports.passport = {
  jwtSecret: JWT_SECRET,
};

async function jwt(payload, done) {
  try {
    const user = await User.findOne({id: payload.id});

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

async function local(email, password, done) {
  try {
    const user = await User.findOne({email});

    if (!user) {
      return done(null, false);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

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
