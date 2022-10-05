//imports
const express = require('express');
const uuid = require('uuid').v4;
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
    { 
        id: 1, 
        author: 'John Doe', 
        text: 'This company is worth every coin!' 
    },
    {
        id: 2,
        author: 'Amanda Doe',
        text: 'They really know how to make you happy.',
    },
];

//endpoints
    //get db array
app.get('/testimonials', (req, res) => {
    res.json(db);
});
    //get db element by id
app.get('/testimonials/:id', (req, res) => {
    res.json(db.find((data) => data.id == req.params.id));
});
    //get random element from db
app.get('/testimonials/random', (req, res) => {
    res.json(db.find((data) => data.id == Math.floor(Math.random() * db.length) + 1));
});

    //add new element to an array
app.post('/testimontials', (req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newTestimonial = { id: id, author, text };
    db.push(newTestimonial);
    res.json({ message: 'ok!' });
});

    //edit new array element
app.put(
    '/testimontials/:id',
    (req, res) => {
        const { author, text } = req.body;
        const id = +req.params.id;
        const testimontial = db.find((testimontial) => testimontial.id === id);
        testimontial.author = author;
        testimontial.text = text;
        res.json({ message: 'ok!' });    },
    (err) => {
        console.log(err);
    }
);

    //delete array element
app.delete(
    '/testimontials/:id',
    (req, res) => {
        const id = +req.params.id;
        db.splice(
            db.findIndex((testimontial) => testimontial.id === id),
            1
        );
        res.json({ message: 'Testimontial deleted' });
    },
    (err) => {
        console.log(err);
    }
);
  
app.use((req, res) => {
    res.status(404).send('404 not found...');
});

