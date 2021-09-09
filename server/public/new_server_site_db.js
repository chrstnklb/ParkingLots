db = new PouchDB('http://localhost:3000/parkplaetze');

function createDataBase() {
    // old local db connection, necessary for migration from old to new in next release
    // db = new PouchDB('parkplaetze');
    const dbAddress = 'http://localhost:3000/parkplaetze'; 
    db = new PouchDB(dbAddress);
    console.log("Database created Successfully.");
}