const { Router } = require('express')
const { getProfilePage } = require('../controllers/userController')
const router = Router()

router.get('/:username', getProfilePage)

module.exports = router


