'use strict';


const  mongoose = require('mongoose');
const  Product = mongoose.model('produtos')
const UserType = mongoose.model('tiposUtilizador');

// JSON
const list = (req,res) => {
    Product.find().then((products)=>{
        res.json({products})
    })
}


// Listar todos os Produtos
const index = (req,res) => {
    let admin = false

    if (req.isAuthenticated() ) {
        UserType.findOne({_id: req.user.tiposUtilizador}).then((userType) => {

            if (userType.nome === "Admin" || userType.nome === "Cliente") {

                if (userType.nome === "Admin"){admin = true}

                Product.find().then((produtos)=>{
                    res.render('admin/Produto/index',{produtos: produtos, admin : admin, loggedUser:req.user})
                }).catch((error)=>{
                    req.flash('error_msg', 'erro ao mostrar a lista de Produtos')
                    res.redirect('/admin')
                })

            }else {
                req.flash('error_msg', "Acesso Restrito")
                res.redirect('/admin')
            }
        })
    }
}

// Mostrar formulario de criaçao de Produto
const create = (req,res) => {
    res.render("admin/Produto/create",{loggedUser:req.user})
}


// Guardar na BD um novo Produto
const store = (req,res) => {
    console.log(req.file)
    let erros = []

    if( req.body.nome === ''){
        erros.push({text : "Nome Invalido"})
    }

    if( req.body.preco === ''){
        erros.push({text : "Insira um Preco"})
    }

    if (erros.length > 0) {
        res.render('admin/Produto/create',{erros:erros})
    }
    else{
        const newProduct = {
            nome:req.body.nome,
            codigo:req.body.codigo,
            tipo:req.body.tipo,
            preco:req.body.preco,
            imagem:req.file.filename
        }
        new Product(newProduct).save().then(()=>{
            req.flash('sucess_msg', 'produto criado com sucesso!')
            res.redirect('/admin/product/index')

        }).catch((err)=>{
            req.flash('error_msg', 'Falha ao criar o produto!')
        })
    }
}


// Apresentar formulario de ediçao de Produto.
const edit = (req,res) => {
    Product.findOne({_id:req.params.id}).then((produto)=>{
        res.render('admin/Produto/edit',{produto:produto, loggedUser:req.user})
    }).catch((err)=>{
        req.flash('error_msg',"Não foi possível encontrar esse produto!")
        res.redirect('/admin/product/index')
    })
}


// Editar e guardar na BD o Produto editado.
const update = (req,res) => {
    Product.findOne({_id:req.body.id}).then((product)=>{
        product.nome = req.body.nome
        product.codigo = req.body.codigo
        product.tipo = req.body.tipo
        product.preco = req.body.preco
        if(req.file){product.imagem = req.file.filename}
        product.save().then(()=>{
                req.flash('sucess_msg','Produto editado com sucesso')
                res.redirect('/admin/product/index')
            }

        )
    }).catch((err)=>{
        req.flash('error_msg',"Houve um erro ao editar o Produto!")
        res.redirect('/admin/product/index')
    })
}


// Apagar registo de Produto da BD.
const deleteProduct = (req,res) => {
    Product.remove({_id:req.params.id}).then(()=>{
        req.flash('sucess_msg','Produto apagado com sucesso')
        res.redirect('/admin/product/index')

    }).catch((err)=>{
        req.flash('error_msg',"Houve um erro ao apagar o Produto")
        res.redirect('/admin/product/index')
    })
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    deleteProduct,
    list,
};







