// Create a new PouchDB instance
const db = new PouchDB("bookshopDB");

// Add a document to the database
db.put({
  _id: "1",
  title: "Lord of the Rings",
  author: "J.R.R. Tolkien",
})
  .then(() => {
    console.log("Document added!");
  })
  .catch((error) => {
    console.error("Error adding Document", error);
  });

// Retrieve a document from the database by its id
db.get("1")
  .then((documento) => {
    console.log("Document:", documento);
  })
  .catch((error) => {
    console.error("Error getting Document:", error);
  });