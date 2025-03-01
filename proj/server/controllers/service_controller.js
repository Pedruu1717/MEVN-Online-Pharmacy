'use strict';

// const User = require('../models/Utilizador');
const  mongoose = require('mongoose');
const  Service = mongoose.model('servicos')
const UserType = mongoose.model('tiposUtilizador');
const User = mongoose.model('utilizadores');
const multer = require('multer')

// JSON
const list = (req,res) => {
    Service.find().then((servicos)=>{
        res.json({servicos})
    })
}

// Listar todos os users
const index = (req,res) => {

    let admin = false

    if (req.isAuthenticated() ) {
        UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {

            if (userType.nome === "Admin" || userType.nome === "Cliente") {

                if (userType.nome === "Admin"){admin = true}

                        Service.find().populate('utilizadores').then((servicos)=>{
                            // res.send(servicos)
                            res.render('admin/servico/index',{servicos: servicos, admin : admin, loggedUser:req.user})

                        }).catch((error)=>{
                            res.flash('error_msg', 'erro ao mostrar a lista de Serviços')
                            res.redirect('/admin')
                        })
            }else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }
}

// Mostrar formulario de criaçao de user
const create = (req,res) => {

    let p = '633c6e76511e2c5ae83a166e' // id do prestador.

    User.find({tiposUtilizador: p }).then((prestadores) => {
        res.render('admin/servico/create', {prestadores: prestadores, loggedUser:req.user})
    }).catch((err) => {
        req.flash('error_msg', "Não foi possível carregar os prestadores de serviço!")
        res.redirect("/admin/service/index")
    })
}


const store = (req,res) => {
    console.log(req.file)
    let erros = [];

    if( req.body.nome === null){
        erros.push({text : "Nome Inválido"})
    }

    if( req.body.preco === ''){
        erros.push({text : "Insira um preço"})
    }

    if( req.body.descricao === ''){
        erros.push({text : "Insira uma descrição"})
    }

    if( req.body.prestador === ''){
        erros.push({texto : "Prestador Inválido"})
    }

    if (erros.length > 0) {
        res.render('admin/servico/create',{erros:erros})
    }
    else{
        const newService = {
            nome:req.body.nome,
            descricao:req.body.descricao,
            preco:req.body.preco,
            utilizadores:req.body.prestador,
            imagem:req.file.filename,
        }
        new Service(newService).save().then(()=>{
            req.flash('sucess_msg', 'Serviço criado com sucesso!')
            res.redirect('/admin/service/index')

        }).catch((err)=>{
            req.flash('error_msg', 'Falha ao criar o Serviço!')
        })
    }
}


// Apresentar formulario de ediçao de user.
const edit = (req,res) => {
    let p = '6084db3ebbe5193cbce5ff03' // id do prestador.

    Service.findOne({_id:req.params.id}).then((service)=>{
        User.find({tiposUtilizador: p }).then((prestadores) => {
            res.render('admin/Servico/edit',{servico:service, loggedUser:req.user, prestadores: prestadores})
        })
    }).catch((err)=>{
        req.flash('error_msg',"Não foi possível encontrar esse Serviço!")
        res.redirect('/admin/service/index')
    })
}


// Editar e guardar na BD o user editado.
const update = (req,res) => {
    Service.findOne({_id:req.body.id}).then((service)=>{
        service.nome = req.body.nome
        service.codigo = req.body.descricao
        service.preco = req.body.preco
        service.utilizadores = req.body.prestador
        if(req.file){service.imagem = req.file.filename}

        service.save().then(()=>{
                req.flash('sucess_msg','Serviço editado com sucesso')
                res.redirect('/admin/service/index')
            }

        )
    }).catch((err)=>{

        req.flash('error_msg',"Houve um erro ao editar o Serviço!")
        res.redirect('/admin/service/index')
    })
}


// Apagar registo de user da BD.
const deleteService = (req,res) => {
    Service.remove({_id:req.params.id}).then(()=>{
        req.flash('sucess_msg','Serviço apagado com sucesso')
        res.redirect('/admin/service/index')

    }).catch((err)=>{
        req.flash('error_msg',"Houve um erro ao apagar o Serviço")
        res.redirect('/admin/service/index')
    })
}

module.exports = {
    list,
    index,
    create,
    store,
    edit,
    update,
    deleteService,
};







