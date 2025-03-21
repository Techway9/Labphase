// import express from 'express';
// import { addFood, listFood, removeFood } from '../controllers/foodController.js';
// import multer from 'multer';
// const foodRouter = express.Router();

// //Image Storage Engine (Saving Image to uploads folder & rename it)

// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         return cb(null,`${Date.now()}${file.originalname}`);
//     }
// })

// const upload = multer({ storage: storage})

// foodRouter.get("/list",listFood);
// foodRouter.post("/add",upload.single('image'),addFood);
// foodRouter.post("/remove",removeFood);

// export default foodRouter;

import express from 'express';
import multer from 'multer';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import path from 'path';
import fs from 'fs';

// Initialize Router
const foodRouter = express.Router();

// Ensure 'uploads' folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// ✅ Image Storage Engine (Saving to uploads folder & renaming)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save images in "uploads" folder
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`); // Renamed file
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb(new Error("Only images (jpeg, jpg, png, gif) are allowed!"));
        }
    }
});

// ✅ Routes
foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
