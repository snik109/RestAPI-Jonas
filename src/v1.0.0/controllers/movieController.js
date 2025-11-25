const { getAllObjects, getObjectById, addObject, patchObject, updateObjectById, deleteObjectById } = require('../data/databaseGeneric');
const respond = require('../utils/httpStatusResponder');


const getAllMovies = async (req, res) => {
    try {
        const movies = await getAllObjects();
        respond(res, { data: movies });
    } catch (error) {
        respond(res, { error: error.message });
    }
};


const getSingleMovie = async (req, res) => {
    try {
        const movie = await getObjectById(req.params.id);
        respond(res, { data: movie, notFound: !movie });
    } catch (error) {
        respond(res, { error: error.message });
    }
};

const createMovie = async (req, res) => {
    try {
        const newMovie = await addObject(req.body);
        respond(res, { created: true, data: newMovie });
    } catch (error) {
        respond(res, { error: error.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await updateObjectById(req.params.id, req.body);
        respond(res, { data: updatedMovie, notFound: !updatedMovie });
    } catch (error) {
        respond(res, { error: error.message });
    }
};

const patchMovie = async (req, res) => {
    try {
        const patchedMovie = await patchObject(req.params.id, req.body);
        respond(res, { data: patchedMovie, notFound: !patchedMovie });
    } catch (error) {
        respond(res, { error: error.message });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const deleted = await deleteObjectById(req.params.id);
        respond(res, { data: deleted, notFound: !deleted });
    } catch (error) {
        respond(res, { error: error.message });
    }
};

module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovie,
    patchMovie,
    deleteMovie
}