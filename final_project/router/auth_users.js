const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Function to check if the username is valid (e.g., not empty and unique)
const isValid = (username) => {
    return username && !users.some(user => user.username === username);
};

// Function to check if the username and password match those we have in records
const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (authenticatedUser(username, password)) {
        const accessToken = jwt.sign({ username }, 'access', { expiresIn: '1h' });

        req.session.authorization = {
            accessToken,
            username
        };

        return res.status(200).json({ message: "User successfully logged in" });
    } else {
        return res.status(401).json({ message: "Invalid login. Check username and password." });
    }
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;
    const username = req.session.authorization.username;

    const book = Object.values(books).find((book, index) => index + 1 == isbn);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!book.reviews) {
        book.reviews = {};
    }
    book.reviews[username] = review;

    return res.status(200).json({ message: "Review added or updated successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const username = req.session.authorization.username;

    const book = Object.values(books).find((book, index) => index + 1 == isbn);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (book.reviews && book.reviews[username]) {
        delete book.reviews[username];
        return res.status(200).json({ message: "Review deleted successfully" });
    } else {
        return res.status(404).json({ message: "Review not found or you do not have permission to delete this review" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
