// Function to get all books using an async callback
const getAllBooksAsync = async (callback) => {
  try {
    // Simulate fetching books from a database or external source
    let books = await fetchBooks(); // Assuming fetchBooks is an async operation
    callback(null, books);
  } catch (error) {
    callback(error, null);
  }
};

// Example callback usage
getAllBooksAsync((error, books) => {
  if (error) {
    console.error("Error fetching books:", error);
  } else {
    console.log("Books retrieved:", books);
  }
});

// Mock function to simulate async book fetching
async function fetchBooks() {
  // This mock simulates fetching data, replace it with your actual data retrieval logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(require("./booksdb.js")));
    }, 1000);
  });
}
