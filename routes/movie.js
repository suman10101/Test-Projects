import express from 'express'
import { createMovie,getAllMovies, getMovieById, searchMoviesByName } from '../controllers/movie.js';
import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/',auth, createMovie)
router.get('/list', auth, getAllMovies)
router.get('/:id',auth, getMovieById)
router.get('/',auth, searchMoviesByName)

export default router