//imports
const express = require('express');
const uuid = require('uuid').v4;
const app = express();
const db = require('./db.js');
const cors = require('cors');

//set server
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');

//middleware
app.use(express.urlencoded ({ extended:false }));
app.use(express.json());
app.use(cors());
app.use('/api/', testimonialsRoutes); 
  
app.use((req, res) => {
    res.status(404).send('404 not found...');
});

