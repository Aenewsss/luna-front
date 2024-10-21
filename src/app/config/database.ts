import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL user
  password: 'root', // Your MySQL password
  database: 'luna', // Your database name
  port: 3306
});