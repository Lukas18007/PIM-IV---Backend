const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const funcionariosRoutes = require('./routes/funcionarios');
const folhasPagtoRoutes = require('./routes/folhasPagto');
const departamentosRoutes = require('./routes/departamento');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get('/', function (req, res) {
    return res.send("está é a API da istorm. Ela foi feita para fins acadêmicos.");
})

app.use('/funcionarios', funcionariosRoutes);
app.use('/folhas_pagamento', folhasPagtoRoutes);
app.use('/departamentos', departamentosRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});