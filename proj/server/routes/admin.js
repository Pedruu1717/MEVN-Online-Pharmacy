require('../models/TipoUtilizador')
//require('../models/Categoria')
//require('../models/Postes')
require('../models/Utilizador')

const  express  = require('express')
const  mongoose = require('mongoose')
const  router = express.Router()
//const  Categoria = mongoose.model('categorias')
//const  Postes = mongoose.model('postes')
const  UserType = mongoose.model('tiposUtilizador')
const  User = mongoose.model('utilizadores')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const {isAdmin} = require("../helpers/authenticatedUserType")

router.get('/',isAdmin, (req,res)=>{

    let admin = false
    let cliente = false
    let prestador = false

    UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {
        if (userType.nome === "Admin") {admin = true}
        else if (userType.nome === "Cliente") {cliente = true}
        else {prestador = true}
        res.render('admin/index',{admin:admin, cliente:cliente, prestador:prestador, id:req.user.id, loggedUser:req.user})
    })
})


router.get('/login2',(req,res,next) =>{
    User.find().then((TipoUtilizadores)=>{
        // res.render('admin/login',{TipoUtilizadores: TipoUtilizadores})
        res.send({TipoUtilizadores: TipoUtilizadores})

    }).catch((error)=>{
        res.flash('error_msg', 'erro ao mostrar a lista de categorias')
        res.redirect('/admin')
    })

    passport.authenticate("local",{
        //Caso tenha sucesso ou insucesso redireciona para as seguintes rotas
        successRedirect : "/admin",
        failureRedirect : "/",
        failureFlash :true
    })(req,res,next)

})

router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if (!user){
            return res.status(401).json({
                title: 'O utilizador não se encontra registado.',
                error: 'Os dados inseridos estão incorretos.'
            })
        }

        //Password incorreta
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login não efetuado.',
                error: 'Verifique se a password inserida está correta.'
            })
        }
        //Login com sucesso (Criar token)

        req.token = jwt.sign({ userId: user._id}, 'secretkey')
        return res.status(200).json({
            title: 'Login feito com sucesso',
            error: 'approved',
            token: token
        })
    })

})



module.exports = router


