import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model'
import { ENV } from './env';

passport.use(new GoogleStrategy({
  clientID: ENV.GOOGLE_CLIENT_ID,
  clientSecret: ENV.GOOGLE_CLIENT_SECRET,
  callbackURL: ENV.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName || `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();

    if (!email) return done(new Error('No email from Google'), undefined);

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        password: '',     // not used for Google users
        isGoogle: true
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err as Error);
  }
}));

export default passport;
