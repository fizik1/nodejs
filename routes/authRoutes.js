const { Router } = require('express')
const router = Router()
const { getLoginPage, getRegistrPage, registrNewUser, loginUser, logOut } = require('../controllers/authController')

router.get('/login', getLoginPage )
router.get('/signup', getRegistrPage)
router.post('/signup', registrNewUser)
router.post('/login', loginUser)
router.get('/logout', logOut)


module.exports = router