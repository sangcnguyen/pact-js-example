const express = require("express");
const { getMovies, getMovieById, getMovieByName } = require("./actions");

const app = express();
app.use(express.json());

const movies = getMovies();

app.get("/movies", (req, res) => {
  res.send(movies);
});

app.get("/movies/:id", (req, res) => {
  const movie = getMovieById(req.params.id);
  if (!movie) {
    res.status(404).send("Movie not found");
  } else {
    res.send(movie);
  }
});

app.post("/movies", (req, res) => {
  const movie = {
    id: movies[movies.length - 1].id + 1,
    name: req.body.name,
    year: req.body.year,
  };

  if (getMovieByName(req.body.name)) {
    res.send(`Movie ${req.body.name} already exists`);
  } else {
    movies.push(movie);
    res.send(movie);
  }
});

app.delete("/movies/:id", (req, res) => {
  const movie = getMovieById(req.params.id);
  if (!movie) {
    res.status(404).send(`Movie ${req.params.id} not found`);
  } else {
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(`Movie ${req.params.id} has been deleted`);
  }
});

module.exports = app;
