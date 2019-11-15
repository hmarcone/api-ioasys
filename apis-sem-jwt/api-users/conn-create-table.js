const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'ioasys',
  password : 'ioasys@2019',
  database : 'ioasys'
});
 
connection.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
  createTableUser(connection);
})

function addRowsUser(conn){
    const sql = "INSERT INTO Users(Nome, Login, Password) VALUES ?";
    const values = [
          ['hmarcone', 'hmarcone', '123'],
          ['Ioasys', 'ioasys', '123'],
          ['joaquin', 'joaquin', '123']
        ];
    conn.query(sql, [values], function (error, results, fields){
            if(error) return console.log(error);
            console.log('adicionou registros na tabela user!');
            conn.end();//fecha a conexão
        });
  }

function createTableUser(conn){

    const sql = "CREATE TABLE IF NOT EXISTS Users (\n"+
                "ID int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(150) NOT NULL,\n"+
                "Login varchar(150) NULL,\n"+
                "Password varchar(150) NULL,\n"+
                "PRIMARY KEY (ID)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela a tabela users!');
        addRowsUser(conn);
    });
}