import express from "express";
import { addProject, getProjects } from '../controllers/projectControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/add',authMiddleware, upload.single('image') ,addProject);
router.get('/get', getProjects);

export default router;