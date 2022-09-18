const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const middlewareAuth = require('../middleWare/authMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', middlewareAuth, userController.check)

module.exports = router
