const express = require('express');
const  mongoose = require('mongoose');
const User = require('../models/Categoria');

const {
    index,
    create,
    store,
    edit,
    update,
    deleteCategory,
} = require('../controllers/category_controller');

const router = express.Router();

router
    .get('/admin/category/index', index)
    .get('/admin/category/create', create)
    .post('/admin/category/store', store)
    .get('/admin/category/edit/:id', edit)
    .post('/admin/category/update', update)
    .post('/admin/category/delete/:id', deleteCategory);
;

module.exports = router