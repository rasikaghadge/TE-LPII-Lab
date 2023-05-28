const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// In-memory user storage (replace with a database in production)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/login');
}

// Login route
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
  });

// Handle registration form submission
app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username is already taken
    const userExists = users.some(user => user.username === username);
  
    if (userExists) {
      res.send('Username already taken');
    } else {
      // Create a new user
      const newUser = { id: users.length + 1, username, password };
      users.push(newUser);
      req.session.isAuthenticated = true;
      res.redirect('/dashboard');
    }
  });
  

// Login route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials are valid
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username or password');
  }
});

// Dashboard route (authenticated)
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
