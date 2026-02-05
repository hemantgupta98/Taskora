import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleDB } from "./auth.model.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn(
    "Google OAuth not configured: missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET",
  );
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await googleDB.findOne({ email: profile.emails[0].value });

          if (!user) {
            user = await googleDB.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              avatar: profile.photos[0].value,
            });
          }

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      },
    ),
  );
}
