//imports
const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const path = require('path');
const db = require('./db.js');

const app = express();

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

//middleware
app.use(express.urlencoded ({ extended:false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/', testimonialsRoutes); 
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

//set server
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});