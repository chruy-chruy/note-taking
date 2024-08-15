require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const noteRoutes = require('./src/routes/notes');
require('./src/config/passport');
const swaggerUi = require('swagger-ui-express');
YAML = require('yamljs');
swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,  // Ensure this is defined in your .env file
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Set secure to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
});

app.use('/api/notes', noteRoutes);

// Routes for Google OAuth
app.get('/api/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

const jwt = require('jsonwebtoken');

// Google OAuth callback route
app.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ accessToken: token });
});

// Logout route
app.get('/logout', (req, res) => {
  // Assuming you send the token in a header or query parameter
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    addToBlacklist(token); // Add token to blacklist
  }

  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session', error: err });
      }
      res.json({ message: 'User logged out successfully' });
    });
  });
});

//swager
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

// Export the app instance
module.exports = app;