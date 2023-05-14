const router = require("express").Router()
const {
    uploadFile,
    send,
    sendFile,
    getFileById,
    downloadFile,
    testEmail
} = require('../controllers/file.controller')
const upload = require('../util/multer.js')

router.post('/', sendFile)
router.post('/upload', upload.single('file'), uploadFile)
router.post('/send', send)
router.get('/:id', getFileById)
router.post('/test', testEmail)
router.get('/download/:id', downloadFile)


module.exports = router