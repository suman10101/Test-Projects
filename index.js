import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user.js'
import movieRoutes from './routes/movie.js'
const app = express();
const port = 3000;

app.use(express.json({ limit: "30mb", extended: true }));

app.use("/user", userRoutes);
app.use("/movies", movieRoutes);


mongoose.connect('mongodb+srv://suman:suman@cluster0.emetmbk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
