const multer = require('multer');

const storage = multer.diskStorage({

    // Set up storage for uploaded files

    destination: function (req, file, cb) {

        if (file.fieldname == "profile") {
            console.log(file.fieldname);
            cb(null, './public/images/user-profile');
        } else {
            cb(null, './public/images/product');
        }
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }

});


const upload = multer({ storage: storage });

module.exports = upload;

