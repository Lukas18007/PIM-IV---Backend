const express = require('express');
const bodyParser = require('body-parser');
const funcionariosRoutes = require('./routes/funcionarios');
const folhasPagtoRoutes = require('./routes/folhasPagto');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', function (req, res) {
    return res.send("está é a API da istorm. Ela foi feita para fins acadêmicos.");
})

app.use('/funcionarios', funcionariosRoutes);
app.use('/folhas_pagamento', folhasPagtoRoutes);

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});