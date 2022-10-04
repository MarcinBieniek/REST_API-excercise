//imports
const express = require('express');

const app = express();

//set server
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

//middleware
app.use(express.urlencoded ({ extended:false }));
app.use(express.json());