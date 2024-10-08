const express = require('express');
let books = require("./booksdb.js"); // Import the books object
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
  }
  if (users.some(user => user.username === username)) {
      return res.status(400).json({ message: "User already exists!" });
  }
  users.push({ username, password });
  res.status(200).json({ message: "User successfully registered. Now you can login" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.status(200).json(books); // Respond with the books object
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn; // Get ISBN from the request parameters
  const book = Object.values(books).find((book, index) => index + 1 == isbn); // Find book by its index
  if (book) {
    res.status(200).json(book); // Send the book details
  } else {
    res.status(404).send('Book not found'); // Handle if the book is not found
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase(); // Get author from request parameters
  const booksByAuthor = Object.values(books).filter((book) => book.author.toLowerCase() === author); // Filter books by author
  if (booksByAuthor.length > 0) {
    res.status(200).json(booksByAuthor); // Send books if found
  } else {
    res.status(404).send('No books found for this author'); // Handle no books found
  }
});

// Get book details based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase(); // Get title from request parameters
  const booksByTitle = Object.values(books).filter((book) => book.title.toLowerCase() === title); // Filter books by title
  if (booksByTitle.length > 0) {
    res.status(200).json(booksByTitle); // Send books if found
  } else {
    res.status(404).send('No books found with this title'); // Handle no books found
  }
});

// Get book reviews by ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn; // Get ISBN from request parameters
  const book = Object.values(books).find((book, index) => index + 1 == isbn); // Find book by its index
  if (book && book.reviews) {
    res.status(200).json(book.reviews); // Send reviews if found
  } else {
    res.status(404).send('Reviews not found for this book'); // Handle no reviews
  }
});

module.exports.general = public_users;
