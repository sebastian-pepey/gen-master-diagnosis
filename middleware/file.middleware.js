const multer = require('multer');
const path = require('path');

let multerDiskStorage = multer.diskStorage(
    {
        destination : (req,file,cb) => {
            let folder = path.join(__dirname,'./../public/files');
            cb(null,folder);
        },

        filename : (req,file,cb) => {
            let imageName = 'M01'+'19_01_2022'+" "+"22_10_23"+path.extname(file.originalname);
            cb(null,imageName);
        }
    }
)

let fileUpload = multer({storage : multerDiskStorage});

module.exports = fileUpload;
