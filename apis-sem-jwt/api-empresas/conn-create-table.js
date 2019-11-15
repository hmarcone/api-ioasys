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
  createTableEmpresa(connection);
})

function addRowsEmpresa(conn){
    const sql = "INSERT INTO Empresas(Nome,NomeFantasia) VALUES ?";
    const values = [
          ['Oracle', 'Oracle LTDA.'],
          ['IOASYS', 'IOASYS LTDA.'],
          ['Nubank', 'Nubank do Brasil']
        ];
    conn.query(sql, [values], function (error, results, fields){
            if(error) return console.log(error);
            console.log('adicionou registros na tabela empresa!');
            conn.end();//fecha a conexão
        });
  }

function createTableEmpresa(conn){

    const sql = "CREATE TABLE IF NOT EXISTS Empresas (\n"+
                "ID int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(150) NOT NULL,\n"+
                "NomeFantasia varchar(150) NULL,\n"+
                "PRIMARY KEY (ID)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela a tabela empresa!');
        addRowsEmpresa(conn);
    });
}
