// routeHandlers.js
const fs = require('fs');
const path = require('path');

function handleHomeRoute(req, res) {
    const todosFilePath = path.join(__dirname, 'todos.json');
    const readStream = fs.createReadStream(todosFilePath, 'utf8');

    let todosData = '';

    readStream.on('data', (chunk) => {
        todosData += chunk;
    });

    readStream.on('end', () => {
        const todos = JSON.parse(todosData);

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Simple Todo List</title>
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <h1>Todo List</h1>
                <ul>
                    ${todos.map(todo => `<li>${todo.text}</li>`).join('')}
                </ul>
            </body>
            </html>
        `;

        res.setHeader('Content-Type', 'text/html');
        res.end(htmlContent);
    });
}

// routeHandlers.js
// ...

function handleAstronomyRoute(req, res) {
    // Set the appropriate content type for an image

    res.setHeader('Content-Type', 'text/html');

    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Not Found</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <h1>Descriptionn</h1>
            <p>This is description for the image </p>
            <img src = "./imges/astronomy.jpg">
        </body>
        </html>
`)

}
function handleImageRoute(req, res) {
    const imagePath = path.join(__dirname, 'imges', 'astronomy.jpg');
    const imageStream = fs.createReadStream(imagePath);
    imageStream.on('error', (error) => {
        console.error('Error reading image:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    });

    // Set the appropriate content type for an image

    res.setHeader('Content-Type', 'image/jpeg');


    // Pipe the image stream directly to the response
    imageStream.pipe(res);


}

// ...


function handleStylesRoute(req, res) {
    const cssFilePath = path.join(__dirname, 'styles.css');
    const cssFileStream = fs.createReadStream(cssFilePath);

    cssFileStream.on('error', (error) => {
        console.error('Error reading CSS file:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    });



    res.setHeader('Content-Type', 'text/css');
    cssFileStream.pipe(res);
}

function handleNotFound(req, res) {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Not Found</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <h1404>404 - Not Found</h1>
            <p>Sorry, the page you are looking for might be in another galaxy.</p>
        </body>
        </html>
    `;

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(htmlContent);
}


module.exports = {
    handleHomeRoute,
    handleAstronomyRoute,
    handleStylesRoute,
    handleNotFound,
    handleImageRoute
};





// function handleAstronomyRoute(req, res) {
//     const imagePath = path.join(__dirname, 'imges', 'astronomy.jpg');
//     const imageStream = fs.createReadStream(imagePath);

//     imageStream.on('error', (error) => {
//         console.error('Error reading image:', error);
//         res.statusCode = 500;
//         res.end('Internal Server Error');
//     });

//     // Check if the request accepts HTML
//     if (req.headers.accept && req.headers.accept.includes('text/html')) {
//         // If the request accepts HTML, serve the HTML content
//         const htmlContent = `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Astronomy</title>
//                 <link rel="stylesheet" href="/styles.css">
//             </head>
//             <body>
//                 <h1>Astronomy</h1>
//                 <img src="./imges/astronomy.jpg" alt="Astronomy Image">
//                 <p>jhskdhk</p>
//             </body>
//             </html>
//         `;
//         res.setHeader('Content-Type', 'text/html');
//         res.end(htmlContent);
//     } else {
//         // Set the appropriate content type for an image
//         res.setHeader('Content-Type', 'image/jpeg');

//         // Pipe the image stream directly to the response
//         imageStream.pipe(res);
//     }
// }
