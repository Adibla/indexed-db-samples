// Opens (or creates) a database called "BookshopDB" with version 1
const request = indexedDB.open('BookshopDB', 1);

// manage the event fired when the database is created or upgraded
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // create an object store called "Books" with an index called "genre"
  const bookStore = db.createObjectStore('Books', { keyPath: 'isbn' });
  bookStore.createIndex('genre', 'genre', { unique: false });
  // insert some data into the object store
  bookStore.add({ isbn: '12345', title: 'The Great Gatsby', genre: 'Novels' });
  bookStore.add({ isbn: '67890', title: '1984', genre: 'Distopy' });
};
// manage the event fired when the database is opened with success
request.onsuccess = (event) => {
  const db = event.target.result;
  // execute a transaction to read data from the object store
  const transaction = db.transaction(['Books'], 'readwrite');
  const bookStore = transaction.objectStore('Books');
  // execute a request to get all the books with genre "Novels"
  const genreIndex = bookStore.index('genre');
  const request = genreIndex.getAll('Novels');
  request.onsuccess = (event) => {
   const novels = event.target.result;
   console.log('Novels: ', novels);
  };
  transaction.oncomplete = () => {
   db.close();
  };
};