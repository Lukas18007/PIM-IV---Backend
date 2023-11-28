const express = require('express');
const router = express.Router();
const db = require('../connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'a1b2c3d4';

router.get('/usuarios/departamento/:id', async (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM usuarios WHERE departamento = ?', [id], async (err, result) => {
        if (err) {
            console.error('Erro ao buscar usuario:', err);
            res.status(500).send('Erro ao buscar usuario');
        } else {
            if (result.length === 0) {
                res.status(404).send('Usuário não encontrado');
            } else {
                res.json(result);
            }
        }
    });
});

router.post('/register', async (req, res) => {
    const { nome, tipo, departamento, senha, email } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, result) => {
        if (err) {
            return res.status(500).send('Erro no servidor');
        }

        if (result.length > 0) {
            return res.status(400).send('Usuário já existe');
        }

        const hashedsenha = await bcrypt.hash(senha, 6);

        db.query('INSERT INTO usuarios (nome, tipo, departamento, senha, email) VALUES (?, ?, ?, ?, ?)', [nome, tipo, departamento, hashedsenha, email], (err) => {
            if (err) {
                return res.status(500).send(`Erro ao registrar usuário: ${err}`);
            }
            res.status(201).send('Usuário registrado com sucesso');
        });
    });
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, result) => {
        if (err) {
            return res.status(500).send('Erro no servidor');
        }

        if (result.length === 0) {
            return res.status(401).send('Credenciais inválidas');
        }

        const user = result[0];

        const validsenha = await bcrypt.compare(senha, user.senha);

        if (!validsenha) {
            return res.status(401).send('Credenciais inválidas');
        }

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ 
            token: token,
            nome: user.nome, 
            tipo: user.tipo, 
            departamento: user.departamento 
        });
    });
});

module.exports = router;