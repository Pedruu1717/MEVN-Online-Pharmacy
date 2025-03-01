const localStrategy = require("passport-local").Strategy
const mongoose = require ("mongoose")
const bcrypt = require("bcrypt")

// Model do Utilizador
require ("../models/Utilizador")
const User = mongoose.model('utilizadores');

module.exports = function (passport){

    passport.use(new localStrategy({usernameField : 'email', passwordField : "password"},(email,password,done) => {
        User.findOne({email:email}).then((user)=>{
            if(!user){
                return done(null, false, {message : "Utilizador inexistente"})
            }
            bcrypt.compare(password,user.password, (erro, semelhante) => {
                if (semelhante){
                    return done(null,user)
                }else {
                    return done(null,false,{message : "Password Incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((user,done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id,done) => {
        User.findById(id, (err,user) => {
            done(err,user)
        })
    })
}
