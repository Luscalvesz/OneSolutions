var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'usuario',//usuario local
    password : 'senha',//senha usuario local
    database : 'one_solutions'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Conectado com sucesso!')
});

module.exports = connection;