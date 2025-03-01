const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Produto = new Schema({
    nome:{
        type:String,
        require:true
    },
    codigo:{
        type:String,
        require:true
    },
    tipo:{
        type:String,
        required:true,
        // ref:'tipo'

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
        required:false
    }
})
mongoose.model('produtos', Produto)