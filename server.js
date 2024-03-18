// URL base do cadastro: http://localhost:3000/signup/
/*
Modelo para testes no postman: 

{
    "name": "atualizou",
    "email": "atualizacao@gmail.com",
    "password": "adhgasg"
}
*/

//Nome do banco no Xampp: signup (aí é só importar o login lá que já funciona)


const express = require('express')
const cors = require('cors')

const createDBConnection = require('./db')

const db = createDBConnection() 

const app = express()

app.use(cors())

app.use(express.json())

const dotenv = require('dotenv')
dotenv.config()

app.use(express.urlencoded({extended: true}))

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida.');
});

db.query("SELECT id, name, email, password FROM login", function (err, rows, fields) {
    if (!err) {
        console.log("Resultado:", rows);
    } else {
        console.log('Erro: Consulta não realizada com sucesso!', err);
    }
});

const signupRoutes = require('./routes/signup')
app.use('/signup', signupRoutes)

const loginRotes = require('./routes/login')
app.use('/login', loginRotes)

const logoutRotes = require('./routes/logout')
app.use('/logout', logoutRotes)

const resetPasswordRoutes = require('./routes/resetPassword'); // Importe o novo endpoint de redefinição de senha
app.use('/reset-password', resetPasswordRoutes);

const port = process.env.PORT || 8081

app.listen(port, ()=> {
    console.log(`Servidor iniciado na porta ${port}`)
})
app.get('/', (req,res) =>{
    res.json({message: 'Testando API'})
})

// app.get('/forgot-password', async (req, res, next) => {
    
// });

// app.post('/forgot-password', async (req, res, next) => {
//     const sql = "SELECT * FROM login WHERE email = ? "
//     const { email } = req.body

//     const validationEmail = "SELECT COUNT(*) AS count FROM login WHERE email = ?";
//         db.query(validationEmail, [email], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//         const emailExists = result[0].count > 0;
//             if (!emailExists) {
//                 return res.status(400).json({ message: 'Este email não está cadastrado' });
//             }
        
//         const teste = secret + userpassword
//         const token = jwt.sign(playload, teste, {expiresIn: '2h'})
//         const link = `http://localhost/reset-password/${user.id}/$token`
//     });
// });

// app.get('/reset-password', async (req, res, next) => {
    
// });

// app.post('/reset-password', async (req, res, next) => {
    
// });