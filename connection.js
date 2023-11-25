require('dotenv').config();
var mysql = require('mysql');

var db = mysql.createConnection(process.env.DATABASE_URL)

db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados MySQL');
    }
});

module.exports = db;