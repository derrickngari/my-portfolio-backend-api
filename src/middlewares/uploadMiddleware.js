import multer from 'multer';
import { CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
    transformation: [
      { width: 800, height: 600, crop: "limit" 
    }]
    },
});

const upload = multer({ storage: storage});

export default upload;

