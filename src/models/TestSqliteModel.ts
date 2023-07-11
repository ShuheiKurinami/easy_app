import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

// Open a database connection
let db = new sqlite3.Database('../database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
    process.exit(-1);
  }
  console.log('Connected to the SQlite database.');
});

// Create table
let createTable = `CREATE TABLE users (
  user TEXT,
  email TEXT
);`

db.run(createTable, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Table test_user created successfully.');
});

// This is just an example of inserting data to the table
let insertData = `INSERT INTO test_user(user, email)
                  VALUES('test_user', 'test@example.com')`;

db.run(insertData, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Data inserted successfully.');
});
