const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/:id?', (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const query = 'SELECT fp.*, f.nome as nomeFunc, f.salario FROM folhasPagto fp INNER JOIN funcionarios f ON f.id = fp.funcionario WHERE fp.id = ?';
  
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
      const query = 'SELECT fp.*, f.nome as nomeFunc, f.salario FROM folhasPagto fp INNER JOIN funcionarios f ON f.id = fp.funcionario';
  
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
    const query = 'SELECT fp.*, f.nome as nomeFunc, f.salario FROM folhasPagto fp INNER JOIN funcionarios f ON f.id = fp.funcionario WHERE funcionario = ?';

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

router.get('/departamento/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT fp.*, f.nome as nomeFunc, f.salario FROM folhasPagto fp INNER JOIN funcionarios f ON f.id = fp.funcionario WHERE f.departamento = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar as folhas desse departamento:', err);
            res.status(500).send('Erro ao buscar as folhas desse departamento');
        } else {
            if (results.length === 0) {
                res.status(404).send('Folhas de pagamento não encontradas para esse departamento');
            } else {
                res.json(results);
            }
        }
    });
});

router.get('/usuario/:nome', (req, res) => {
    const { nome } = req.params;
    const query = 'SELECT fp.*, f.nome as nomeFunc, f.salario FROM folhasPagto fp INNER JOIN funcionarios f ON f.id = fp.funcionario WHERE fp.usuario = ?';

    db.query(query, [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar as folhas desse departamento:', err);
            res.status(500).send('Erro ao buscar as folhas desse departamento');
        } else {
            if (results.length === 0) {
                res.status(404).send('Folhas de pagamento não encontradas para esse departamento');
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
        usuario
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
                recebimento = results[0].salario - vlImposto + bonus;

                const query = 'INSERT INTO folhasPagto (funcionario, imposto, vlImposto, horasTrabalhadas, bonus, recebimento, data_vigencia, usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

                db.query(query, [
                    funcionario,
                    imposto,
                    vlImposto,
                    horasTrabalhadas,
                    bonus,
                    recebimento,
                    data_vigencia,
                    usuario
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
        usuario
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
                let recebimento = results[0].salario - vlImposto + bonus;

                const query = "UPDATE folhasPagto SET funcionario = ?, imposto = ?, vlImposto = ?, horasTrabalhadas = ?, bonus = ?, recebimento = ?, data_vigencia = ?, usuario = ? WHERE id = ?";

                db.query(query, [
                    funcionario,
                    imposto,
                    vlImposto,
                    horasTrabalhadas,
                    bonus,
                    recebimento,
                    data_vigencia,
                    usuario,
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
