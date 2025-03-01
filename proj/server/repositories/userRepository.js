'use strict';

const  mongoose = require('mongoose');
const  User = mongoose.model('utilizadores')

//Executa query para buscar todos os produtos de um user.
function userProducts(id) {
    return User.findOne({_id: id})
        .then(function (user) {
            return user.produtos
        })
        .catch(function (err) {
            console.log(err);
        });

}


//Executa query para buscar todos os servicos de um user.
function userServicos(id) {
    return User.findOne({_id: id})
        .then(function (user) {
            return user.servicos
        })
        .catch(function (err) {
            console.log(err);
        });

}



module.exports = {
    userProducts,
    userServicos,
}


