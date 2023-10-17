const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/:id?', (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const query = 'SELECT * FROM funcionarios WHERE id = ?';
  
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Erro ao buscar funcionário por ID:', err);
          res.status(500).send('Erro ao buscar funcionário por ID');
        } else {
          if (results.length === 0) {
            res.status(404).send('Funcionário não encontrado');
          } else {
            res.json(results[0]);
          }
        }
      });
    } else {
      const query = 'SELECT * FROM funcionarios';
  
      db.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao buscar funcionários:', err);
          res.status(500).send('Erro ao buscar funcionários');
        } else {
          res.json(results);
        }
      });
    }
});
  
router.post('/', (req, res) => {
    const {
         nome, 
         cargo, 
         salario, 
         cpf, 
         telefone, 
         endereco, 
         dtAdmissao, 
         horasTrabalhadas, 
         bonus, 
         departamento, 
         dataNascimento 
        } = req.body;
    const query = 'INSERT INTO funcionarios (nome, cargo, salario, cpf, telefone, endereco, dtAdmissao, horasTrabalhadas, bonus, departamento, dataNascimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [
        nome, 
        cargo, 
        salario, 
        cpf, 
        telefone, 
        endereco, 
        dtAdmissao, 
        horasTrabalhadas, 
        bonus, 
        departamento, 
        dataNascimento
    ], (err, result) => {
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
    const {
        nome, 
        cargo, 
        salario, 
        cpf, 
        telefone, 
        endereco, 
        dtAdmissao, 
        horasTrabalhadas, 
        bonus, 
        departamento, 
        dataNascimento 
    } = req.body;
    const query = 'UPDATE funcionarios SET nome = ?, cargo = ?, salario = ?, cpf = ?, telefone = ?, endereço = ?, dtAdmissao = ?, horasTrabalhadas = ?, bonus = ?, departamento = ?, dataNascimento = ? WHERE id = ?';

    db.query(query, [
        nome, 
        cargo, 
        salario, 
        cpf, 
        telefone, 
        endereco, 
        dtAdmissao, 
        horasTrabalhadas, 
        bonus, 
        departamento, 
        dataNascimento,
        id
    ], (err) => {
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