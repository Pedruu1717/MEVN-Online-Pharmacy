const express = require('express');
const  mongoose = require('mongoose');
const ServiceRoutes = require('../models/Servico');
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
    list,
    index,
    create,
    store,
    edit,
    update,
    deleteService,
} = require('../controllers/service_controller');

const router = express.Router();

router
    .get('/admin/services', list)
    .get('/admin/service/index', index)
    .get('/admin/service/create', create)
    .post('/admin/service/store', upload.single("imagem"), store)
    .get('/admin/service/edit/:id', edit)
    .post('/admin/service/update',  upload.single("imagem"), update)
    .get('/admin/service/delete/:id', deleteService)
;

module.exports = router
