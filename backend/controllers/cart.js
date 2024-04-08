const Cart = require('../models/cart.js');
const books = require('../models/books.js');
const dotenv = require('dotenv');
const ObjectID = require('mongodb').ObjectId;
dotenv.config();

exports.getWholeCart = async (req, res) => {
    const { email } = req.body;
    // console.log(email);
    try {
        const cart = await Cart.findOne({ email }).populate('reservations');
        // console.log(cart);
        if (!cart) {
            return res.status(200).json({ message: 'Cart not found' });
        }
        res.json(cart.reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.addToCart = async (req, res) => {
    const { email, object_id } = req.body;

    try {
        let cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        if (cart.reservations.includes(object_id)) {
            return res.status(200).json({ message: 'Book already in cart' });
        }

        // const book = await books.findById({ _id: new ObjectID(object_id) });
        // console.log(book);

        // if (!book) {
        //     return res.status(404).json({ message: 'Book not found' });
        // }

        // if (!book.availability) {
        //     return res.status(200).json({ message: 'Book not available to reserve' });
        // }

        cart.reservations.push(object_id);
        cart = await cart.save();

        res.status(200).json({ message: "Book added", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.deletefromCart = async (req, res) => {
    const { email, object_id } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { email },
            { $pull: { reservations: object_id } },
            { new: true }
        );


        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};