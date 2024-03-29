const multer = require('multer');

const Storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: Storage });

module.exports = upload;