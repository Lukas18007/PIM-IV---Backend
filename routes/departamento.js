const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/:id?', (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const query = 'SELECT * FROM departamentos WHERE id = ?';
  
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Erro ao buscar departamento por ID:', err);
          res.status(500).send('Erro ao buscar departamento por ID');
        } else {
          if (results.length === 0) {
            res.status(404).send('departamento não encontrado');
          } else {
            res.json(results[0]);
          }
        }
      });
    } else {
      const query = 'SELECT * FROM departamentos';
  
      db.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao buscar departamentos:', err);
          res.status(500).send('Erro ao buscar departamentos');
        } else {
          res.json(results);
        }
      });
    }
});

  module.exports = router;