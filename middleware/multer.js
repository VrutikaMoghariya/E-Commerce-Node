const multer = require('multer');

const storage = multer.diskStorage({

    // Set up storage for uploaded files

    destination: function (req, file, cb) {

        if (file.fieldname == "profile") {
            cb(null, './public/images/user-profile');
        } else if (file.fieldname == "thumbnail") {
            cb(null, './public/images/thumbnail');
        } else if (file.fieldname == "images") {
            cb(null, './public/images/products');
        }
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }

});


const upload = multer({ storage: storage });

module.exports = upload;

