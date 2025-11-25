const express = require('express');
const app = express();
const movieRoutes = require('./v1/routes/movieRoutes');
const cors = require('cors');

//Middleswares
app.use(express.json());
app.use(cors());

//setup routes | www.localhost:3872/api/v1/movies
app.use("/api/v1/movies", movieRoutes);


app.listen(3872, () => {
    console.log('Server is running on port 3872');
})