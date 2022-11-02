import { openDB } from 'idb';

const initdb = async () =>
  openDB('Jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('Jate')) {
        console.log('Jate database already exists');
        return;
      }
      db.createObjectStore('Jate', { keyPath: 'id', autoIncrement: true });
      console.log('Jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  const contactDb = await openDB('Jate', 1);

  const tx = contactDb.transaction('Jate', 'readwrite');

  const store = tx.objectStore('Jate');

  const request = store.add({ content: content });

  const result = await request;
  console.log('content saved to the database', result);
};
;

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
const contactDb = await openDB('Jate', 1);

const tx = contactDb.transaction('Jate', 'readonly');

const store = tx.objectStore('Jate');

const request = store.get(1);

const result = await request;
console.log('result.value', result);
return result?.value;
};

initdb();
