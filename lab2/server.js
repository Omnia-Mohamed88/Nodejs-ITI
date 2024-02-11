// server.js
const http = require('http');
const { handleHomeRoute, handleAstronomyRoute, handleStylesRoute, handleNotFound, handleImageRoute } = require('C:/Users/mohamed/Desktop/Lab2NodeToDo/routeHandel.js');


const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        handleHomeRoute(req, res);
    } else if (req.url === '/astronomy') {
        handleAstronomyRoute(req, res);
    } else if (req.url ==='/astronomy.jpg') {
        handleImageRoute(req, res);

    } else if (req.url.endsWith('.css')) {
        handleStylesRoute(req, res);
    } else {
        handleNotFound(req, res);
    }
});

function start() {
    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/`);
    });
}

module.exports = { start };
