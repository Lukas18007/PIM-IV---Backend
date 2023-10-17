var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'seu usuário',
  password : 'sua senha',
  database : 'nome do banco de dados'
});

db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados MySQL');
    }
});

module.exports = db;
