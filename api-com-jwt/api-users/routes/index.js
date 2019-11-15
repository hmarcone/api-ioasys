const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
//const consulta = "SELECT * FROM tabela WHERE id = ?";

router.get('/', (req, res) => res.json({ message: 'Funcionando na porta 3001!' }));
router.get('/api/users/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Users' + filter, res);
});
router.delete('/api/users/:id', (req, res) => {
    execSQLQuery('DELETE FROM Users WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/api/users', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    const login = req.body.login.substring(0, 150);
    execSQLQuery(`INSERT INTO Users (Nome, login) VALUES('${nome}','${login}')`, res);
});
router.patch('/api/empresas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0, 150);
    const login = req.body.login.substring(0, 150);
    execSQLQuery(`UPDATE Users SET Nome='${nome}', Login='${login}' WHERE ID=${id}`, res);
});
//app.use('/', router);

//inicia o servidor
//app.listen(port);
console.log('API funcionando na porta 3001!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'ioasys',
        password: 'ioasys@2019',
        database: 'ioasys'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}
module.exports = router;
