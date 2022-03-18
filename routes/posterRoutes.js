const { Router } = require('express')
const router = Router()
const upload = require('../utils/fileUpload')
const { 
    getPostersPage,
    addNewPoster,
    addNewPosterPage,
    getPosterPage,
    getEditPosterPage,
    updatePoster,
    deletePoster
} = require('../controllers/posterControllers')
const { protected } = require('../middleware/auth')

router.get('/', getPostersPage)
router.get('/add',protected,  addNewPosterPage)
router.post('/add', upload.single('image'), addNewPoster)
router.get('/:id', getPosterPage)
router.get('/:id/edit', getEditPosterPage)
router.post('/:id/edit', updatePoster)
router.post('/:id/delete', deletePoster)



module.exports = router