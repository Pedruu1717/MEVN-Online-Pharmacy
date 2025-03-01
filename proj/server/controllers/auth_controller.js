'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('utilizadores')
const passport = require('passport')

const login = (req, res) =>{
    res.render("admin/Auth/login")
}

const loginPost = (req, res, next) =>{
    passport.authenticate("local",{
        //Caso tenha sucesso ou insucesso redireciona para as seguintes rotas
        successRedirect : "/admin",
        failureRedirect : "/login",
        failureFlash :true
    })(req,res,next)
}

const logout = (req, res) => {
    req.logOut()
    res.redirect("http://localhost:3002")
}

module.exports = {
    login,
    loginPost,
    logout
};