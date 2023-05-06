const mongoose = require('mongoose');

const ratingsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    }
});

module.exports= ratingsSchema;