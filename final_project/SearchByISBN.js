// Function to search by ISBN using Promises
const searchByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    // Simulate fetching the book from a database
    const books = Object.values(require("./booksdb.js"));
    const book = books.find((book, index) => index + 1 == isbn);
    
    if (book) {
      resolve(book);
    } else {
      reject("Book not found with ISBN: " + isbn);
    }
  });
};

// Example usage
searchByISBN(1)
  .then((book) => console.log("Book found:", book))
  .catch((error) => console.error(error));
