// Function to search books by author
const searchByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    const books = Object.values(require("./booksdb.js"));
    const booksByAuthor = books.filter((book) => book.author.toLowerCase() === author.toLowerCase());

    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor);
    } else {
      reject("No books found for author: " + author);
    }
  });
};

// Example usage
searchByAuthor("Chinua Achebe")
  .then((books) => console.log("Books by author:", books))
  .catch((error) => console.error(error));
