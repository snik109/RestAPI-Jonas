const { getAllObjects, getObjectById, addObject, patchObject, updateObjectById, deleteObjectById } = require('../data/databaseGeneric');

const getAllMovies = async (req, res) => {
    try {
        const movies = await getAllObjects();
        res.status(200).json({ success: true, data: movies });
    } catch (error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const getSingleMovie = async (req, res) => {
    try {
        const movie = await getObjectById(req.params.id);
        res.status(200).json({ success: true, data: movie });
    } catch (error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const createMovie = async (req, res) => {
    try {
        const newMovie = await addObject(req.body);
        res.status(201).json({ success: true, data: newMovie });
    } catch (error){
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await updateObjectById(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedMovie });
    } catch (error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const patchMovie = async (req, res) => {
    try {
        const patchedMovie = await patchObject(req.params.id, req.body);
        res.status(200).json({ success: true, data: patchedMovie });
    } catch (error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const success = await deleteObjectById(req.params.id);
        res.status(200).json({ success: success });
    } catch (error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovie,
    patchMovie,
    deleteMovie
}