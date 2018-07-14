const sqlite3 = require('sqlite3').verbose();
 
// open the database
const path = require('path')
const dbPath = path.resolve(__dirname, 'rva.db'); // resolve path db

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the rva database.');
});
 
module.exports = db;