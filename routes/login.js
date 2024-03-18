const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const salt = 10

const createDBConnection = require('../db')

const db = createDBConnection() 

const dotenv = require('dotenv')
dotenv.config()
const secret = process.env.JWT_KEY
router.use(cookieParser());

const verifyjwt = (req, res, next) => {
    // const token = req.headers["Authorization"]
    const token = req.cookies.token;
    if(!token){
        return res.json('Você não está autenticado')

    } else{
        jwt.verify(token, secret, (err, decoded) =>{
            if(err){
                res.json("Token invalido")

            }else{
                req.id = decoded.id
                next()
            }
        })
    }
}

router.get('/', verifyjwt, (req,res) => {
    return res.json({Status: "Sucesso", id: req.id})
})

router.post('/', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email.match(emailpattern)) {
        return res.status(400).json({ message: 'Email inválido' })
    }

    const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

        if (!password.match(passwordpattern)) {
            return res.status(400).json({ message: 'Senha inválida, a senha deve conter: 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 1 número, 12 dos caracteres' })
        }

    const sql = "SELECT * FROM login WHERE email = ? "
    db.query(sql, [email], (err, data) => {
        if (err) return res.json({Error:"Erro de login no servidor"});
    
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Erro ao comparar senhas"})
                if(response) {
                    const id = data[0].id
                    const token = jwt.sign({id}, secret, {expiresIn: '1d'})
                    res.cookie('token', token)

                    return res.json({Login: true, token, data})
                    // return res.json({Status: "Success"})
                    // return res.status(201).json({ message: 'Logado no sistema com sucesso' })

                } else{
                    return res.json({Error: "Senha inválida"})
                }
            })

            // const id = data[0].id
            // const token = jwt.sign({id}, secret, {expiresIn: 300})
            // return res.json({Login: true, token, data})

            }else{
                return res.json({Error:"email inexistente"})
            }
        
    })
})
module.exports=router