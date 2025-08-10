import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model'
import { ENV } from './env';
import { Strategy as GitHubStrategy } from 'passport-github2';
import axios from 'axios';

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

passport.use(new GitHubStrategy({
  clientID: ENV.GITHUB_CLIENT_ID,
  clientSecret: ENV.GITHUB_CLIENT_SECRET,
  callbackURL: ENV.GITHUB_CALLBACK_URL,
  scope: ['user:email']    // request user's emails (important)
},
async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    // profile.emails may be undefined for some GitHub accounts -> attempt fallback
    let email: string | undefined = profile.emails?.[0]?.value;

    if (!email && accessToken) {
      // fallback: call GitHub API to list user emails (requires user:email scope)
      const resp = await axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `token ${accessToken}`, 'User-Agent': 'node.js' }
      });
      const emails = resp.data as Array<any>;
      email = emails.find(e => e.primary && e.verified)?.email || emails[0]?.email;
    }

    if (!email) return done(new Error('No email available from GitHub'), undefined);

    const name = profile.displayName || profile.username || 'GitHub User';
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: '',      // not used for OAuth users
        isGithub: true
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

export default passport;
