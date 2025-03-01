const mongoose = require('mongoose');
const User = mongoose.model('utilizadores')
const UserType = mongoose.model('tiposUtilizador')

module.exports = {
    isAdmin: function (req, res,next) {
        if (req.isAuthenticated()){
            UserType.findById(req.user.tiposUtilizador).then((userType) => {
                console.log(req.user.tiposUtilizador)
                console.log(userType)
                if (userType.nome === "Admin" || userType.nome === "Cliente" || userType.nome === "Prestador"){
                    return next()
                }
            })
        }else {
            res.redirect("/login")
        }

    }
}




