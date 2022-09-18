const Router = require('express')
const { getAll } = require('../controllers/typeController')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleWare/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)


module.exports = router
