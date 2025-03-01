'use strict';

// const User = require('../models/Utilizador');
const mongoose = require('mongoose');
const User = mongoose.model('utilizadores');
const UserType = mongoose.model('tiposUtilizador');
const userRepo = require('../repositories/userRepository');
const Service = mongoose.model('servicos');
const Product = mongoose.model('produtos');
const bcrypt = require('bcrypt');
const nodemailer = require( "nodemailer");

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

const newdate = year + "/" + month + "/" + day

const addservice = (req, res) => {

    User.findOne({_id:req.user.id}).then((Utilizador)=>{
        Service.findOne({_id:req.params.id}).then((servico)=>{
            Utilizador.servicos.push(servico)
            Utilizador.save().then(()=>{
                req.flash('sucess_msg', 'Servico adquirido com sucesso!')
                sendMail(req.user.email);
                res.render('admin/Utilizador/invoiceService',{servico: servico, utilizador:Utilizador,data:newdate , loggedUser:req.user})
            }).catch((err)=>{
                req.flash('error_msg', 'Falha ao adquirir o Serviço!')
            })
        })
    })
}

const addproduct = (req, res) => {

    User.findOne({_id:req.user.id}).then((Utilizador)=> {
        Product.findOne({_id: req.params.id}).then((produto) => {
                Utilizador.produtos.push(produto)
                Utilizador.save().then(() => {
                    req.flash('sucess_msg', 'Produto adquirido com sucesso!')

                    sendMail(req.user.email, req.user.nome, produto.nome, produto.preco);

                    res.render('admin/Utilizador/invoiceProduct', {
                        produto: produto,
                        utilizador: Utilizador,
                        data: newdate,
                        loggedUser: req.user,
                    })
                }).catch((err) => {
                    req.flash('error_msg', 'Falha ao adquirir o Produto!')
                })

        })
    })
}


const sendMail = (userEmail,nome,nomeproduto,precoproduto) => {
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();

        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",   //"smtp.office365.com",//"smtp.mailtrap.io",
            port: 587,    //2525,
            //secure: false,
            auth: {
                user: "servfarmdai@gmail.com",
                pass: "farmacia123"
            },
        });


        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"ServFarm" <4d83e079ac-2397b7@inbox.mailtrap.io>', // sender address
            to: userEmail, // list of receivers
            subject: "Comprovativo de Compra", // Subject line
            text: "Aqui está o seu comprovativo...", // plain text body
            html: "<h1>Aqui está o seu comprovativo...</h1>" +
                "<img style='width: 10%' src='cid:unique@nodemailer.com' alt='logo'/>" +
                "<b>Boas Exmo. : </b> " +nome+
                "<br>" +"<br>" +
                "<b>Produto:</b>" +nomeproduto+ "<b>Preço:</b>" +precoproduto+
                "",
            attachments: [{
                filename: 'logo.png',
                path: '../client/src/assets/img/logo.jpg',
                cid: 'unique@nodemailer.com' //same cid value as in the html img src
            }]
        });

        console.log("Email enviado: %s", info.messageId);

    }
    main().catch(console.error);
}


// Listar todos os produtos de um utilizador.
const products = (req,res) => {
     userRepo.userProducts(req.params.id)
        .then(function (produtos) {

            User.findOne({_id:req.params.id}).then((utilizador)=>{
                res.render('admin/Utilizador/produtos',{produtos: produtos, utilizador : utilizador, loggedUser:req.user})
            }).catch((err)=>{
                req.flash('error_msg',"Não foi possível encontrar este utilizador!")
                res.redirect('/admin/user/index')
            })
            return produtos
        });
}


// Listar todos os servicos de um utilizador.
const servicos = (req,res) => {

    userRepo.userServicos(req.params.id)
        .then(function (servicos) {

            User.findOne({_id:req.params.id}).then((utilizador)=>{
                    res.render('admin/Utilizador/servicos', {
                        servicos: servicos,
                        utilizador: utilizador,
                        loggedUser: req.user
                    })
            }).catch((err)=>{
                req.flash('error_msg',"Não foi possível encontrar este utilizador!")
                res.redirect('/admin/user/index')
            })

            return servicos
        });
}

// Listar todos os users
const index = (req,res) => {

    if (req.isAuthenticated() ) {
        UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {

            if (userType.nome === "Admin") {
                //Corpo
                User.find().populate('tiposUtilizador').sort({data: 'desc'}).then((utilizadores) => {
                    res.render('admin/Utilizador/index', {utilizadores: utilizadores, loggedUser:req.user})

                }).catch((error) => {
                    req.flash('error_msg', 'erro ao mostrar a lista de utilizadores')
                    res.redirect('/admin')
                })
                //Fim Corpo
            }
            else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }

}

const show = (req,res) => {
    let admin = false
    let cliente = false
    let prestador = false

    if (req.isAuthenticated() ) {
        UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {
            if (userType.nome === "Admin") {admin = true}
            else if (userType.nome === "Cliente") {cliente = true}
            else {prestador = true}

            User.findOne({_id: req.params.id}).then((utilizador) => {
                res.render("admin/Utilizador/show", {utilizador: utilizador, admin:admin, cliente:cliente, prestador:prestador, loggedUser:req.user})
            }).catch((err) => {
                req.flash('error_msg', "Utilizador Inexistente!")
                res.redirect("admin/Utilizador/index")
            })
        })
    }

}

// Mostrar formulario de criaçao de user
const create = (req,res) => {

    if (req.isAuthenticated()) {
       UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {
            if (userType.nome === "Admin") {
                //Corpo
                UserType.find().then((tiposUtilizador) => {
                    res.render("admin/Utilizador/create", {tiposUtilizador: tiposUtilizador, loggedUser:req.user})
                }).catch((err) => {
                    req.flash('error_msg', "Não foi possível carregar os tipos de utilizadores!")
                    res.redirect("admin/Utilizador/create")
                })

           //Fim Corpo
            }else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }
}

// Guardar na BD um novo User
const store = (req,res) => {

    let erros = []
    if (req.body.tiposUtilizador === '0' ){
        erros.push({text: 'Tipo de utilizador inválido!'})
    }

    if (erros.length > 0) {
        res.render('admin/utilizador/create',{erros:erros})
    }

    else{
        const newUser = {
            nome:req.body.nome,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,10),
            tiposUtilizador:req.body.tiposUtilizador,
        }
        new User(newUser).save().then(()=>{
            req.flash('sucess_msg', 'utilizador criado com sucesso!')
            res.redirect('/admin/user/index')

        }).catch((err)=>{
            req.flash('error_msg', 'Falha ao criar utilizador!')
        })
    }
}


// Apresentar formulario de ediçao de user.
const edit = (req,res) => {
    let admin = false
    if (req.isAuthenticated()) {
        UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {
            if (userType.nome === "Admin" || userType.nome === "Cliente" || userType.nome === "Prestador") {
                if (userType.nome === "Admin") {admin = true}
                //Corpo
                User.findOne({_id:req.params.id}).then((utilizador)=>{
                    res.render('admin/Utilizador/edit',{utilizador:utilizador, admin: admin, loggedUser:req.user})
                }).catch((err)=>{
                    req.flash('error_msg',"Não foi possível encontrar esse utilizador!")
                    res.redirect('/admin/user/index')
                })
                //Fim Corpo
            }else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }
}


// Editar e guardar na BD o user editado.
const update = (req,res) => {

    let oldpassword = req.body.oldpass
    let newPassword = req.body.password

    User.findOne({_id:req.body.id}).then((user)=>{
        user.nome = req.body.nome
        user.email = req.body.email
        if (oldpassword !== newPassword){
            user.password = bcrypt.hashSync(req.body.password,10)
        }
        user.save().then(()=>{
            UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {
                if (userType.nome === "Admin"){
                    req.flash('sucess_msg','Utilizador editado com sucesso')
                    res.redirect('/admin/user/index')
                }else {
                    let uri = "/admin/user/show/" + req.user.id
                    req.flash('sucess_msg','Utilizador editado com sucesso')
                    res.redirect(uri)
                }
            })

            }
        )
    }).catch((err)=>{
        req.flash('error_msg',"Houve um erro ao editar o utilizador!")
        res.redirect('/admin/user/index')
    })
}


// Apagar registo de user da BD.
const deleteUser = (req,res) => {

    if (req.isAuthenticated()) {
        UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {
            if (userType.nome === "Admin") {
                //Corpo
                User.remove({_id:req.params.id}).then(()=>{
                    req.flash('sucess_msg','Utilizador apagado com sucesso')
                    res.redirect('/admin/user/index')

                }).catch((err)=>{
                    req.flash('error_msg',"Houve um erro ao apagar o utilizador")
                    res.redirect('/admin/user/index')
                })
                //Fim Corpo
            }else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }

}


module.exports = {
    index,
    show,
    create,
    store,
    edit,
    update,
    deleteUser,
    products,
    servicos,
    addservice,
    addproduct,
};