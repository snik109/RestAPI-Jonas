const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Path so src directory
const srcPath = __dirname;
console.log(srcPath);

// Read all root folders inside src (e.g., v1.0.0, v2.0.0)
const versions = fs.readdirSync(srcPath).filter(name => {
    const fullPath = path.join(srcPath, name);
    return fs.lstatSync(fullPath).isDirectory() && name.startsWith("v");
});

// Iterate through each version folder
versions.forEach(version => {
    const routesPath = path.join(srcPath, version, "routes");

    // Load all route files inside /routes
    if (fs.existsSync(routesPath)) {
        const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith("Routes.js"));

        routeFiles.forEach(routeFile => {
            const routeModule = require(path.join(routesPath, routeFile));

            // build API mount path based on version + filename
            const routeName = routeFile.replace("Routes.js", "s").toLowerCase(); // movieRoutes.js -> movie
            const apiPath = `/api/${version}/${routeName}`;

            app.use(apiPath, routeModule);

            console.log(`Mounted routes: ${apiPath}`);
        });
    }
});

module.exports = app;


app.listen(3872, () => {
    console.log('Server is running on port 3872');
})