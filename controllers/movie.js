import Movie from '../models/movie.js'

// Create a new movie
export const createMovie = async (req, res) => {
  const body = req.body;

  try {
    const newMovie = await Movie.create(body);
    await newMovie.save();
    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a specific movie by ID
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } 
      return res.status(404).json({ message: "Movie not found." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a specific movie by name
export const searchMoviesByName = async (req, res) => {
  const { name } = req.query;
  try {
    const movies = await Movie.find({ movieName: { $regex: name, $options: 'i' } });
    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
