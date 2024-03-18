const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const createDBConnection = require('../db');
const db = createDBConnection();
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_KEY;

// Endpoint para solicitação de redefinição de senha
router.post('/', (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
    
    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email.match(emailpattern)) {
        return res.status(400).json({ message: 'Email inválido' })
    }

    const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

        if (!newPassword.match(passwordpattern)) {
            return res.status(400).json({ message: 'Senha inválida, a senha deve conter: 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 1 número, 12 dos caracteres' })
        }


    // Verifique se o email existe no banco de dados
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Hash da nova senha
        bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criptografar senha' });
            }

            // Atualize a senha no banco de dados
            const updateSql = "UPDATE login SET password = ? WHERE email = ?";
            db.query(updateSql, [hash, email], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao atualizar a senha' });
                }

                return res.status(200).json({ message: 'Senha redefinida com sucesso' });
            });
        });
    });
});

module.exports = router;
