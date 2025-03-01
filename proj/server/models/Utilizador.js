require('../models/TipoUtilizador')
require('../models/Servico')
require('../models/Produto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tiposUtilizador = mongoose.model('tiposUtilizador')
const servico = mongoose.model('servicos')
const produto = mongoose.model('produtos')


const Utilizador = new Schema({
    nome:{
        type:String,
        required:true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true

    },
    password:{
        type:String,
        required:true
    },
    tiposUtilizador:{
        type:Schema.Types.ObjectId,
        ref:'tiposUtilizador',
        required:false,
        default: '63307a372cd93d4cb8ecaf1d'
    },
    data:{
        type:Date,
        default:Date.now
    },

    produtos:{
        type:Array,
        required: false,
        ref:produto
    },

    servicos:{
        type:Array,
        required: false,
        ref:servico
    },

})
mongoose.model('utilizadores', Utilizador)

