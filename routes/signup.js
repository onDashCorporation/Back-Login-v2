const express = require('express');

const router = express.Router();

const createDBConnection = require('../db')
const db = createDBConnection() 

const bcrypt = require('bcrypt')
const salt = 10

router.post('/', (req, res) => {
    const { name, email, password, cargo } = req.body

    if (!name || !email || !password || !cargo) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }
    if (name === password) {
        return res.status(400).json({ message: 'A senha não pode ser igual ao nome' })
    }

    if (cargo !== '1' && cargo !== '2' && cargo !== '3') {
        return res.status(400).json({ message: 'O cargo deve ser um dos seguintes valores: 1 - Gestor, 2 - Auxiliar, 3 - Solicitante' });
    }
    // const validCargos = ['1', '2', '3'];
    // if (!validCargos.includes(cargo)) {
    //     return res.status(400).json({ message: 'O cargo deve ser um dos seguintes valores: \n1 - Gestor\n2 - Auxiliar\n3 - Solicitante' });
    // }
    // if (cargo != 1 || cargo != 2 ||cargo != 3){
    //     return res.status(400).json({ message: 'O cargo deve ser em número:\n1 - Gestor\n2 - Auxiliar\n3 - Solicitante' })
    // }
    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email.match(emailpattern)) {
        return res.status(400).json({ message: 'Email inválido' })
    }

    const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

        if (!password.match(passwordpattern)) {
            return res.status(400).json({ message: 'Senha inválida, a senha deve conter: 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 1 número, 8 dos caracteres' })
        }


    const validationEmail = "SELECT COUNT(*) AS count FROM login WHERE email = ?";
        db.query(validationEmail, [email], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
    const emailExists = result[0].count > 0;
        if (emailExists) {
            return res.status(400).json({ message: 'Este email já está cadastrado' });
        }

        const sql = "INSERT INTO login (`name`,`email`,`password`, `cargo`) VALUES (?, ?, ?, ?)"
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) =>{
            if(err) return res.json({Error: "Error no hashing de senha"})
            const values = [
                name,
                email,
                hash,
                cargo
            ]
            db.query(sql, values, (err, result) =>{
                if(err){
                    return res.json({Error: "Erro ao inserir dados no sistema"})
                }
                res.status(201).json({ message: 'Dados inseridos no sistema com sucesso' })
            });
        })
    })
})
module.exports = router;