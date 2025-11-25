const express = require('express');
const router = express.Router();
const { getAllMovies, getSingleMovie, createMovie, updateMovie, patchMovie, deleteMovie } = require('../controllers/movieController');

//Get | www.localhost:3872/api/v1/movies
router.get("/", getAllMovies);
router.get("/:id", getSingleMovie);

//Post | www.localhost:3872/api/v1/movies
router.post("/", createMovie);

//Put | www.localhost:3872/api/v1/movies
router.put("/:id", updateMovie);

//Patch | www.localhost:3872/api/v1/movies
router.patch("/:id", patchMovie);

//Delete | www.localhost:3872/api/v1/movies
router.delete("/:id", deleteMovie);

module.exports = router;