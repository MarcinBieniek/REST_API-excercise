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

//database
const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    {
        id: 2,
        author: 'Amanda Doe',
        text: 'They really know how to make you happy.',
    },
];

//endpoints
app.get('/testimonials', (req, res) => {
    res.json(db);
});
  
app.get('/testimonials/:id', (req, res) => {
    res.json(db.find((data) => data.id == req.params.id));
});
  
app.get('/testimonials/random', (req, res) => {
    res.json(db);
});
  
app.use((req, res) => {
    res.status(404).send('404 not found...');
});

