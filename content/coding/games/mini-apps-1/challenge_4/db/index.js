const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'student',
  database: 'player_stats'
})

connection.connect((err) => {
  if (err) {
    console.log('Some error occurred in connecting');
    return;
  }

  console.log('MySQL: Connected as id ' + connection.threadId);
});

module.exports = connection;