const express = require('express');
const router = express.Router();
const multer = require('multer');


// Set up file storage engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../src/images/moodboard/`, )
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: fileStorageEngine});

router.post('/board', upload.single("file"),(req, res) => {
    console.log(req.file);
    res.send('file uploaded');
});

router.get('/board/:fileName', function (req, res) {
    const filePath = file.originalname;
    res.sendFile(filepath);
});

module.exports = router;
