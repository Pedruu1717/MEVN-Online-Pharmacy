const express = require('express');
const  mongoose = require('mongoose');
const product = require('../models/Produto');
const multer = require('multer');

// Define diretório para as imagens.
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "./public/uploads/imgs/");
    },
    filename:function (request,file,callback) { callback(null, Date.now() + "-" + file.originalname);}
})

// Parâmetros de upload para o multer.
const upload = multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3,
    },
})


const {
    index,
    create,
    update,
    store,
    edit,
    deleteProduct,
    list,
} = require('../controllers/product_controller')

const  router = express.Router();


router
    .get('/admin/products', list)
    .get('/admin/product/index', index)
    .get('/admin/product/create', create)
    .post('/admin/product/store', upload.single("imagem"), store)
    .get('/admin/product/edit/:id', edit)
    .post('/admin/product/update',  upload.single("imagem"), update)
    .get('/admin/product/delete/:id', deleteProduct)

module.exports = router

