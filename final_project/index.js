const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const app = express();

app.use(express.json());

// Set up session middleware for customer routes
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Middleware to authenticate user requests for routes that need authentication
app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization) {
      let token = req.session.authorization['accessToken'];
      jwt.verify(token, "access", (err, user) => {
          if (!err) {
              req.user = user;
              next();
          } else {
              return res.status(403).json({ message: "User not authenticated" });
          }
      });
  } else {
      return res.status(403).json({ message: "User not logged in" });
  }
});

// Define routes for customers and general users
app.use("/customer", customer_routes); // Handles registered user actions
app.use("/", genl_routes); // Handles general actions like register and fetching books

// Set the server port
const PORT = 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
