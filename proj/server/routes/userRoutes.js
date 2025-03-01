const express = require('express');
const  mongoose = require('mongoose');
const User = require('../models/Utilizador');

const {
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
} = require('../controllers/user_controller');


const router = express.Router();

router
    .get('/admin/user/index', index)
    .get('/admin/user/show/:id', show)
    .get('/admin/user/create', create)
    .post('/admin/user/store', store)
    .get('/admin/user/edit/:id', edit)
    .post('/admin/user/update', update)
    .get('/admin/user/delete/:id', deleteUser)
    .get('/admin/user/products/:id', products)
    .get('/admin/user/servicos/:id', servicos)
    .get('/admin/user/addservice/:id', addservice)
    .get('/admin/user/addproduct/:id', addproduct)

module.exports = router
