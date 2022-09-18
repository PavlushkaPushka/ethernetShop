require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT || 7000
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleWare/ErrorLandingMiddleware')
const path = require('path')
const { static } = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)
app.use(errorHandler) //обработка ошибок, последний мидлвэйр



const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync() // сверяет состояние базы данных со схемой данных
        app.listen(PORT, ()=>{console.log(`server started on ${PORT} port`)})
    } catch(error) {
        console.log(error)
    }
}



start()