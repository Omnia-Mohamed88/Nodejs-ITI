const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const hostname = '127.0.0.1';

const PORT = process.env.PORT || 3000;
// const app = express();
mongoose.connect('mongodb://localhost:27017/Todos').then((con) => {
  console.log('DB Connected Successfully !!');
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});

// app.use(express.static('public'));
// app.set('view engine', 'pug');

// app.use(express.json());
// app.use((req, res, next) => {
//   console.log('Request received');
//   next();
// });

// app.use('/', router);

// //  app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.status(404).send('Page Not Found.');
// });
// app.listen(PORT, () => {
//   console.log('Server is running on port 3000');
// });

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use('/todos', router);

// app.listen(PORT, () => {
//   console.log('Server is running on port 3000');
// });
