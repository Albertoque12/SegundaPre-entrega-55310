const express = require('express')
const handlebars = require('express-handlebars')
const router = require('./router')
const connectMongo = require('./db')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

connectMongo()

router(app)

module.exports = app


//En este app configuramos el servidor
//En Index lo levantamos 