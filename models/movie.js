import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number },
  director: { type: String },
  actors: [{ type: String }],
  plot: { type: String },
  duration: { type: Number }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;