const express = require("express");
require("dotenv").config();
const app = express();
const { connectDatabase } = require("./db");
const { router } = require("./routes");
const { User } = require("./model/user-model");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // This is crucial for cookies/session to work
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "Harsh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDatabase("mongodb+srv://admin:admin@cluster0.3g5rbuq.mongodb.net/auth");

//basic authentication route
app.use(router);

//google authentication route
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          userName: profile.displayName,
          email: profile.emails[0].value,
        });
        await user.save();
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("http://localhost:5173"));
});

// Get User Info
app.get("/user", (req, res) => res.send(req.user));

app.listen(process.env.PORT, () =>
  console.log(`Server started in on ${process.env.PORT}`)
);
