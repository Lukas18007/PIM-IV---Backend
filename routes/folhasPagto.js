const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/:id?', (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const query = 'SELECT * FROM folhasPagto WHERE id = ?';
  
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Erro ao buscar folha por ID:', err);
          res.status(500).send('Erro ao buscar folha por ID');
        } else {
          if (results.length === 0) {
            res.status(404).send('Folha de pagamento não encontrada');
          } else {
            res.json(results[0]);
          }
        }
      });
    } else {
      const query = 'SELECT * FROM folhasPagto';
  
      db.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao buscar folhas de pagamento:', err);
          res.status(500).send('Erro ao buscar folhas de pagamento');
        } else {
          res.json(results);
        }
      });
    }
});

router.get('/funcionario/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM folhasPagto WHERE funcionario = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar as folhas desse funcionário:', err);
            res.status(500).send('Erro ao buscar as folhas desse funcionário');
        } else {
            if (results.length === 0) {
                res.status(404).send('Folhas de pagamento não encontradas para esse funcionario');
            } else {
                res.json(results);
            }
        }
    });
});
  
router.post('/', (req, res) => {
    const {
        funcionario,
        imposto,
        horasTrabalhadas,
        bonus,
        data_vigencia,
    } = req.body;

    var vlImposto = 0;
    var recebimento = 0;

    const salario = 'SELECT salario FROM funcionarios WHERE id = ?';

    db.query(salario, [funcionario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o salário desse funcionário:', err);
            res.status(500).send('Erro ao buscar o salário desse funcionário');
        } else {
            if (results.length === 0) {
                res.status(404).send('Funcionario não encontrado');
            } else {
                vlImposto = results[0].salario * (imposto / 100);
                recebimento = (results[0].salario - vlImposto) + 300;

                const query = 'INSERT INTO folhasPagto (funcionario, imposto, vlImposto, horasTrabalhadas, bonus, recebimento, data_vigencia) VALUES (?, ?, ?, ?, ?, ?, ?)';

                db.query(query, [
                    funcionario,
                    imposto,
                    vlImposto,
                    horasTrabalhadas,
                    bonus,
                    recebimento,
                    data_vigencia
                ], (err, result) => {
                    if (err) {
                        console.error('Erro ao adicionar folha de pagamento:', err);
                        res.status(500).send('Erro ao adicionar folha de pagamento');
                    } else {
                        res.status(201).json({ id: result.insertId });
                    }
                });
            }
        }
    });
});
  
router.put('/:id', (req, res) => {
    const { id } = req.params;

    const {
        funcionario,
        imposto,
        horasTrabalhadas,
        bonus,
        data_vigencia,
    } = req.body;

    const salario = 'SELECT salario FROM funcionarios WHERE id = ?';

    db.query(salario, [funcionario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o salário desse funcionário:', err);
            res.status(500).send('Erro ao buscar o salário desse funcionário');
        } else {
            if (results.length === 0) {
                res.status(404).send('Funcionario não encontrado');
            } else {
                let vlImposto = results[0].salario * (imposto / 100);
                let recebimento = (results[0].salario - vlImposto) + bonus;

                const query = "UPDATE folhasPagto SET funcionario = ?, imposto = ?, vlImposto = ?, horasTrabalhadas = ?, bonus = ?, recebimento = ?, data_vigencia = ? WHERE id = ?";

                db.query(query, [
                    funcionario,
                    imposto,
                    vlImposto,
                    horasTrabalhadas,
                    bonus,
                    recebimento,
                    data_vigencia,
                    id
                ], (err, result) => {
                    if (err) {
                        console.error('Erro ao atualizar folha de pagamento:', err);
                        res.status(500).send('Erro ao atualizar folha de pagamento');
                    } else {
                        res.status(201).send('Folha de pagamento atualizada com sucesso');
                    }
                });
            }
        }
    });
});
  
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM folhasPagto WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) {
            console.error('Erro ao excluir folha de pagamento:', err);
            res.status(500).send('Erro ao excluir folha de pagamento');
        } else {
            res.send('Folha de pagamento excluída com sucesso');
        }
    });
});

module.exports = router;
