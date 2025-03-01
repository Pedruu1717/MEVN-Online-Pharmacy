const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TipoUtilizador = new Schema({

    nome: {
        type:String,
        required:true
    },

    
    descricao:{
        type:String,
        required:true
    }

})

mongoose.model('tiposUtilizador', TipoUtilizador) 
// deveria ser "usertype" pq na BD ficará "usertypes"!

