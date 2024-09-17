// Function to search books by title
const searchByTitle = (title) => {
  return new Promise((resolve, reject) => {
    const books = Object.values(require("./booksdb.js"));
    const booksByTitle = books.filter((book) => book.title.toLowerCase() === title.toLowerCase());

    if (booksByTitle.length > 0) {
      resolve(booksByTitle);
    } else {
      reject("No books found with title: " + title);
    }
  });
};

// Example usage
searchByTitle("Things Fall Apart")
  .then((books) => console.log("Books by title:", books))
  .catch((error) => console.error(error));
