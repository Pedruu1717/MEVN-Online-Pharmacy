const express = require('express');
const  mongoose = require('mongoose');
const UserType = require('../models/TipoUtilizador');

const {
    index,
    create,
    store,
    edit,
    update,
    deleteUserType,
} = require('../controllers/userTypes_controller');

const  router =  express.Router();

router
    .get('/admin/usertype/index',index)
    .get('/admin/usertype/create',create)
    .post('/admin/usertype/store',store)
    .get('/admin/usertype/edit/:id',edit)
    .post('/admin/usertype/update',update)
    .get('/admin/usertype/delete/:id',deleteUserType);


module.exports = router