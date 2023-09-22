const request = indexedDB.open("BookshopDB", 1);
request.onsuccess = (event) => {
  const db = event.target.result;
  // Start a new transaction
  const transaction = db.transaction(["Books"], "readwrite");
  const bookStore = transaction.objectStore("Books");
  // Add a new book to the object store
  const newBook = {
    isbn: "54321",
    title: "Pride and Prejudice",
    genre: "Novels",
  };
  bookStore.add(newBook);
  transaction.oncomplete = () => {
    console.log("Book added!");
    db.close();
  };
};