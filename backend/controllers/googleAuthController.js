const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ----------------------------
// Google OAuth Redirect
// ----------------------------
exports.googleAuth = asyncErrorHandler(async (req, res, next) => {
    try {
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const options = {
            redirect_uri: 'https://new-e-commerce-ksd0.onrender.com/api/v1/auth/google/callback',
            client_id: process.env.GOOGLE_CLIENT_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'openid',
                'profile',
                'email'
            ].join(' ')
        };

        const qs = new URLSearchParams(options);
        console.log('Redirecting to Google OAuth...');
        res.redirect(`${rootUrl}?${qs.toString()}`);
    } catch (error) {
        return next(new ErrorHandler('Google OAuth initiation failed', 500));
    }
});


exports.googleCallback = asyncErrorHandler(async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect('http://localhost:3000/login?error=google_auth_failed');
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'https://new-e-commerce-ksd0.onrender.com/api/v1/auth/google/callback'
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfo = await oauth2.userinfo.get();
    const { email, name, picture, id: googleId } = userInfo.data;

    let user = await User.findOne({ $or: [{ email }, { googleId }] });
    let isNewUser = false;

    if (user) {
      if (!user.googleId) { user.googleId = googleId; await user.save(); }
    } else {
      user = await User.create({
        name, email, googleId, gender: "other",
        avatar: { public_id: `google_${googleId}`, url: picture }
      });
      isNewUser = true;
    }

    const token = user.getJWTToken();
    // set cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7*24*60*60*1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    // redirect (no token in URL)
    return res.redirect(`http://localhost:3000/oauth-callback?success=true&isNewUser=${isNewUser}`);
  } catch (error) {
    console.error('Google OAuth error details:', error.response?.data || error.message);
    return res.redirect('http://localhost:3000/oauth-callback?error=google_auth_failed');
  }
});


// ----------------------------
// Token-based Google login (One-Tap / Frontend Token)
// ----------------------------
exports.googleTokenLogin = asyncErrorHandler(async (req, res, next) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        // Find existing user by email or googleId
        let user = await User.findOne({ $or: [{ email }, { googleId }] });

        if (user) {
            // Attach Google ID if user exists but used normal signup
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }

            // Send JWT token
            return sendToken(user, 200, res);
        }

        // Create new Google-only user
        user = await User.create({
            name,
            email,
            googleId,
            gender: "other",
            avatar: {
                public_id: `google_${googleId}`,
                url: picture
            }
        });

        return sendToken(user, 201, res);

    } catch (error) {
        return next(new ErrorHandler("Invalid Google Token", 401));
    }
});