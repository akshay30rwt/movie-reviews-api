const Movie = require('../models/Movie');

const addReview = async (req, res) => {
    try {
        const { title, genre, rating, review } = req.body

        const movie = new Movie({ title, genre, rating, review });
        await movie.save();

        return res.status(201).json({
            message: 'Review added successfully',
            movie
        });
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getReviewsAndSearchByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        
        if(!title) {
            const movies = await Movie.find();
            if(movies.length === 0) {
                return res.status(404).json({
                    message: 'There are no movies here'
                });
            }
            return res.status(200).json(movies);
        }

        const filteredMovies = await Movie.find({
            title: { $regex: title, $options: 'i'}
        });
        if(filteredMovies.length === 0) {
            return res.status(404).json({
                message: `No reviews for the movie: ${title}`
            });
        }
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id)

        if(!movie) {
            return res.status(404).json({
                message: `No movie-review with ID: ${id}`
            });
        }

        return res.status(200).json(movie);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateMovieReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, rating, review } = req.body;

        const updatedReview = await Movie.findByIdAndUpdate(id, { title, genre, rating, review }, { new: true });
        if(!updatedReview) {
            return res.status(404).json({
                message: `No Movie Review with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Movie Review updated successfully',
            updatedReview
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const deleteMovieReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Movie.findByIdAndDelete(id);

        if(!deletedReview) {
            return res.status(404).json({
                message: `No Movie Review with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Movie Review deleted successfully',
            deletedReview
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const getReviewsByGenre = async (req, res) => {
    try{
        const { genre } = req.params;
        const filteredReviews = await Movie.find({
            genre: genre
        });

        if(filteredReviews.length === 0) {
            return res.status(404).json({
                message: `No Movie Review in ${genre} genre`
            });
        }

        return res.status(200).json(filteredReviews);
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const sortReviewsByRating = async (req, res) => {
    try {
        const sortedReviews = await Movie.find().sort({
            rating: -1
        });

        if(sortedReviews.length === 0) {
            return res.status(404).json({
                message: 'There are no Movie Reviews'
            });
        }

        return res.status(200).json(sortedReviews);
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { addReview, getReviewsAndSearchByTitle, getReviewById, updateMovieReview, deleteMovieReview, getReviewsByGenre, sortReviewsByRating }