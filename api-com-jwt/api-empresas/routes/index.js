const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3002; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
//const consulta = "SELECT * FROM tabela WHERE id = ?";

router.get('/', (req, res) => res.json({ message: 'Funcionando na porta 3002' }));
router.get('/api/empresas/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Empresas' + filter, res);
});
router.delete('/api/empresas/:id', (req, res) => {
    execSQLQuery('DELETE FROM Empresas WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/api/empresas', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    const nomeFantasia = req.body.nomeFantasia.substring(0, 150);
    execSQLQuery(`INSERT INTO Empresas (Nome, NomeFantasia) VALUES('${nome}','${nomeFantasia}')`, res);
});
router.patch('/api/empresas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0, 150);
    const nomeFantasia = req.body.nomeFantasia.substring(0, 150);
    execSQLQuery(`UPDATE Empresas SET Nome='${nome}', NomeFantasia='${nomeFantasia}' WHERE ID=${id}`, res);
});
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando na porta 3002!');

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
