// IMPORTING MODULE
import multer from 'multer';

// DEFINING STORAGE CONFIGURATION
const storage = multer.diskStorage({
  // Setting destination for uploaded files
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  // Setting unique filename for uploaded files
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// EXPORTING UPLOAD MIDDLEWARE WITH STORAGE SETTINGS AND SIZE LIMIT
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1000 * 1000 },
});
 