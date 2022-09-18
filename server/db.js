const {Sequelize} = require('sequelize')

module.exports = new Sequelize('online_storee', 'postgres', '3333',
    {
        dialect:'postgres',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT
    }

)

// process.env.DB_NAME, //название бд
// process.env.DB_USER, //имя пользователя
// process.env.DB_PASSWORD, //пароль