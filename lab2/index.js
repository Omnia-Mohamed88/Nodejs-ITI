// index.js
const server = require('C:/Users/mohamed/Desktop/Lab2NodeToDo/server.js');

// Start the server
server.start();























// const fs = require('fs');
// const http = require('http');
// const path = require('path');
// const PORT = 3000;

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         const todosFilePath = 'C:/Users/mohamed/Desktop/Lab2NodeToDo/todos.json';
//         const readStream = fs.createReadStream(todosFilePath, 'utf8');

//         let todosData = '';

//         readStream.on('data', (chunk) => {
//             todosData += chunk;
//         });

//         readStream.on('end', () => {
//             const todos = JSON.parse(todosData);

//             const htmlContent = `
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Simple Todo List</title>
//                     <link rel="stylesheet" href="/styles.css">
//                 </head>
//                 <body>
//                     <h1>Todo List</h1>
//                     <ul>
//                         ${todos.map(todo => `<li>${todo.text}</li>`).join('')}
//                     </ul>
//                 </body>
//                 </html>
//             `;

//             res.setHeader('Content-Type', 'text/html');
//             res.end(htmlContent);

//             // Close the readStream
//             readStream.close();
//         });
//     } else if (req.url === '/astronomy') {
//         // The /astronomy route remains the same
//         // ...
//     } else if (req.url.endsWith('.css')) {
//         res.setHeader('Content-Type', 'text/css');
//         const cssFilePath = 'C:/Users/mohamed/Desktop/Lab2NodeToDo/styles.css';
//         const cssFileStream = fs.createReadStream(cssFilePath);
//         cssFileStream.pipe(res);
//     } else {
//         // Handle other routes (404 Not Found)
//         res.statusCode = 404;
//         res.end('Not Found');
//     }
// });

// server.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}/`);
// });










// const todosFilePath = 'C:/Users/mohamed/Desktop/Lab2NodeToDo/todos.json';
// const PORT = 3000;

// const







// const readstream = fs.createReadStream('C:/Users/mohamed/Desktop/Lab2NodeToDo/todos.json')
// const server = http.createServer((req , res)=>


// )