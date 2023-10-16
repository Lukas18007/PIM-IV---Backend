const express = require('express');
const bodyParser = require('body-parser');
const funcionariosRoutes = require('./routes/funcionarios');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', function (req, res) {
    return res.send("olá");
})

app.use('/funcionarios', funcionariosRoutes);

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});