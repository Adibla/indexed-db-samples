// Create or open the database
const request = indexedDB.open("BookshopDB", 1);

// Manage event of database creation or upgrade
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // create an object store called "books" with index "author"
  const bookStore = db.createObjectStore("books", { keyPath: "id" });
  bookStore.createIndex("author", "author", { unique: false });

  // Insert a book into the database
  bookStore.add({
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Austen",
  });
};

// Manage event of database opening
request.onsuccess = (event) => {
  const db = event.target.result;

  // Start a transaction to read data from the database
  const transaction = db.transaction(["books"], "readonly");
  const bookStore = transaction.objectStore("books");

  // Retrieve a book from the database by its id
  const getRequest = bookStore.get(1);

  getRequest.onsuccess = (event) => {
    const book = event.target.result;
    console.log("Book:", book);
  };

  transaction.oncomplete = () => {
    db.close();
  };
};