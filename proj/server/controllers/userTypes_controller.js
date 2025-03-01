'use strict';

// const User = require('../models/Utilizador');
const  mongoose = require('mongoose');
const  UserType = mongoose.model('tiposUtilizador');

const index = (req,res) => {

    if (req.isAuthenticated()) {
        UserType.findOne({_id:req.user.tiposUtilizador}).then((userType) => {

            if (userType.nome === "Admin") {
                //Corpo
                UserType.find().then((TipoUtilizadores)=>{
                    res.render('admin/TipoUtilizador/index',{TipoUtilizadores: TipoUtilizadores, loggedUser:req.user})

                }).catch((error)=>{
                    res.flash('error_msg', 'erro ao mostrar a lista de categorias')
                    res.redirect('/admin')
                })
                //Fim Corpo
            } else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }
}

const create = (req,res) => {
    if (req.isAuthenticated()) {
        UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {

            if (userType.nome === "Admin") {
                //Corpo
                res.render('admin/TipoUtilizador/create',{loggedUser:req.user})
                //Fim Corpo
            } else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }
}

const store = (req,res) => {

    let erros = []

    if(req.body.nome === ''){
        erros.push({text : "Nome Inválido"})
    }

    if(req.body.descricao === ''){
        erros.push({text : "Descrição Inválida"})
    }

    if(erros.length > 0){
        res.render('admin/TipoUtilizador/create',{erros:erros})
    }else{
        const novoTipoUtilizador = {
            nome:req.body.nome,
            descricao:req.body.descricao
        }
        new UserType(novoTipoUtilizador).save().then(()=>{
            req.flash('sucess_msg', 'novoTipoUtilizador criada com sucesso!')
            res.redirect('/admin/usertype/index')

        }).catch((err)=>{
            req.flash('error_msg', 'Falha ao criar novoTipoUtilizador!')
        })
    }
}
const edit = (req,res) => {
    UserType.findOne({_id:req.params.id}).then((tipoutilizador)=>{
        res.render('admin/tipoutilizador/edit',{tipoutilizador:tipoutilizador, loggedUser:req.user})
    }).catch((err)=>{
        req.flash('error_msg',"Houve um erro ao guardar o Tipo de Utilizador")
        res.redirect('/admin/usertype/index')
    })
}
const update = (req,res) => {
    UserType.findOne({_id:req.body.id}).then((userType)=>{
        userType.nome = req.body.nome
        userType.descricao = req.body.descricao
        userType.save().then(()=>{
                req.flash('sucess_msg','tipo Utilizador editada com sucesso')
                res.redirect('/admin/usertype/index')
            }
        )
    }).catch((err)=>{
        req.flash('error_msg',"Houve um erro ao guardar a categoria")
        res.redirect('/admin/usertype/index')
    })

}
const deleteUserType = (req,res) => {
    UserType.remove({_id:req.params.id}).then(()=>{
        req.flash('sucess_msg','Tipo de Utilizador apagado com sucesso')
        res.redirect('/admin/usertype/index')

    }).catch((err)=>{
        req.flash('error_msg',"Houve um erro ao apagar o Tipo de Utilizador")
        res.redirect('/admin/usertype/index')
    })

}


module.exports = {
    index,
    create,
    store,
    edit,
    update,
    deleteUserType
};