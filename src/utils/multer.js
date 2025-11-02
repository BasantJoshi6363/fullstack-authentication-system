import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(cb)
    cb(null, '/home/basantjoshi/Desktop/project/full authentication system/server/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + `${ext}`);
  }
})

const upload = multer({ storage: storage })
export default upload;