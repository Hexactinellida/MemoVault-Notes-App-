import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { 
  createNote, 
  getAllNotes, 
  getNoteById, 
  updateNote, 
  deleteNote 
} from "../controllers/noteController.js";

const noteRouter = express.Router();

// All routes require authentication
noteRouter.post('/create', userAuth, createNote);
noteRouter.get('/all', userAuth, getAllNotes);
noteRouter.get('/:id', userAuth, getNoteById);
noteRouter.put('/:id', userAuth, updateNote);
noteRouter.delete('/:id', userAuth, deleteNote);

//CLOUDINARY

import { upload } from '../config/cloudinary.js';
import { uploadImage, deleteImage } from '../controllers/noteController.js';

noteRouter.post('/:id/images', userAuth, upload.single('image'), uploadImage);
noteRouter.delete('/:id/images', userAuth, deleteImage);

export default noteRouter;