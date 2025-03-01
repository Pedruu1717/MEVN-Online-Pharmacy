const express = require('express')
const app = express();
const handlerbars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')
const authRoutes = require ('./routes/authRoutes')
const userRoutes = require ('./routes/userRoutes')
const userTypesRoutes = require ('./routes/userTypesRoutes')
const productRoutes = require('./routes/productRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const passport = require("passport")
require("./config/auth")(passport)

// configurando a sessão
app.use(session({
    // "origin": "*",
    secret:"ServiFarm",
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(flash())

//Middleware
app.use((req,res,next)=>{
    res.locals.sucess_msg = req.flash('sucess_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})

//Mongoose
mongoose.connect('mongodb://localhost/appFarm', { useUnifiedTopology: true, useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, }).then(()=>{
    console.log('Conetado ao mongo')
}).catch((err)=>{
    console.log('Erro de conexao no mongo:'+ err)
})

//adicionando a Rota do admin

const admin = require(__dirname + '/routes/admin')
const path = require('path')

/// CONFIGURANDO O BODY PARSER

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.engine('handlebars', handlerbars({defaultLayout: __dirname + '/views/layouts/main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }},
))
app.set('view engine', 'handlebars')

//public
app.use(express.static(path.join(__dirname, "public")))

app.use(userRoutes)
app.use(userTypesRoutes)
app.use(productRoutes)
app.use(serviceRoutes)
app.use(authRoutes)

app.use('/admin', admin)


const PORT = 8082

app.listen(PORT, () =>{
    console.log(`Listening On http://localhost:${PORT}/login`);
})



