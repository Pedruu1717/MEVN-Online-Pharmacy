require('../models/Utilizador')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const utilizadores = mongoose.model('utilizadores')



const Servico = new Schema({
    nome:{
        type:String,
        require:true
    },
    descricao:{
        type:String,
        require:true
    },
    preco:{
        type:Number,
        required:true

    },
    data:{
        type:Date,
        default:Date.now()
    },
    imagem:{
         type:String,
         required:false,
    },
    utilizadores:{
        type:Schema.Types.ObjectId,
        ref:'utilizadores',
        required:true,
    },
})
mongoose.model('servicos', Servico)