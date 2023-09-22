// Create a new Dexie instance
const db = new Dexie("BookshopDB");

// define schema for the database
db.version(1).stores({
  books: "++id, title, author",
});

// Add a book to the database
db.books
  .add({ title: "Pride and Prejudice", author: "Jane Austen" })
  .then(() => {
    console.log("Book added!");
  })
  .catch((error) => {
    console.error("Error adding book", error);
  });

// Get all books from the database
db.books
  .toArray()
  .then((books) => {
    console.log("Books in the Database:", books);
  })
  .catch((error) => {
    console.error("Error reading books:", error);
  });