const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM funcionarios';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar funcionários:', err);
            res.status(500).send('Erro ao buscar funcionários');
        } else {
            res.json(results);
        }
    });
});
  
router.post('/', (req, res) => {
    const { nome, cargo, salario } = req.body;
    const query = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)';

    db.query(query, [nome, cargo, salario], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar funcionário:', err);
            res.status(500).send('Erro ao adicionar funcionário');
        } else {
            res.status(201).json({ id: result.insertId });
        }
    });
});
  
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario } = req.body;
    const query = 'UPDATE funcionarios SET nome = ?, cargo = ?, salario = ? WHERE id = ?';

    db.query(query, [nome, cargo, salario, id], (err) => {
        if (err) {
            console.error('Erro ao atualizar funcionário:', err);
            res.status(500).send('Erro ao atualizar funcionário');
        } else {
            res.send('Funcionário atualizado com sucesso');
        }
    });
});
  
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM funcionarios WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) {
            console.error('Erro ao excluir funcionário:', err);
            res.status(500).send('Erro ao excluir funcionário');
        } else {
            res.send('Funcionário excluído com sucesso');
        }
    });
});

module.exports = router;