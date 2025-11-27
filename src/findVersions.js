//* Find and mount versioned routes dynamically aka all root folders inside src that start with "v"
// ignore all versions that are set to true in versionIgnore.json *//

const fs = require('fs');
const path = require('path');
const versionIgnore = require('./versionIgnore.json');

function findVersions (apps){
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
    try {
    const routesPath = path.join(srcPath, version, "routes");
    // if version is in versionIgnore.json and set to true, skip it
    if (versionIgnore[version]) {
        console.log(`Skipping version ${version} as per versionIgnore.json`);
        return; // Skip this version
    }

    // Load all route files inside /routes
    if (fs.existsSync(routesPath)) {
        const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith("Routes.js"));

        routeFiles.forEach(routeFile => {
            try {
            const routeModule = require(path.join(routesPath, routeFile));

            // build API mount path based on version + filename
            const routeName = routeFile.replace("Routes.js", "s").toLowerCase(); // movieRoutes.js -> movie
            const apiPath = `/api/${version}/${routeName}`;

            apps.use(apiPath, routeModule);

            console.log(`Mounted routes: ${apiPath}`);
            } catch (routeErr) {
                console.error(`Error loading route file ${routeFile} for version ${version}:`, routeErr);
            }
        });
    } 
    } catch (versionErr) {
        console.error(`Error loading routes for version ${version}:`, versionErr);
    }
});

}
module.exports = findVersions;