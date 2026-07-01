const express = require('express');
const router = express.Router();

const { addReview, getReviewsAndSearchByTitle, getReviewById, updateMovieReview, deleteMovieReview, getReviewsByGenre, sortReviewsByRating } = require('../controllers/movieControllers');

router.post('/', addReview);
router.get('/', getReviewsAndSearchByTitle);
router.get('/filter/:genre', getReviewsByGenre);
router.get('/sorted/rating', sortReviewsByRating);
router.get('/:id', getReviewById);
router.put('/:id', updateMovieReview);
router.delete('/:id', deleteMovieReview);

module.exports = router;