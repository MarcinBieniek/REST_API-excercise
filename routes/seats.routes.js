const express = require('express');
const uuid = require('uuid').v4;
const db = require('../db.js');

const router = express.Router();

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find((seat) => seat.id === +req.params.id));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = uuid();
    const newSeat = { id: id, day, seat, client, email };
    db.seats.push(newSeat);
    res.json({ message: 'ok!' });
});

router.route('/seats/:id').delete(
    (req, res) => {
        const id = +req.params.id;
        db.seats.splice(
            db.seats.findIndex((seat) => seat.id === id),
            1
        );
        res.json({ message: 'Seat deleted' });
    },
    (err) => {
        console.log(err);
    }
);

router.route('/seats/:id').put(
    (req, res) => {
        const { day, seat, client, email } = req.body;
        const id = +req.params.id;
        const seatEdit = db.seats.find((seat) => seat.id === id);
        seatEdit.day = day;
        seatEdit.seat = seat;
        seatEdit.client = client;
        seatEdit.email = email;
        res.json({ message: 'ok!' });
    },
    (err) => {
        console.log(err);
    }
);

module.exports = router;