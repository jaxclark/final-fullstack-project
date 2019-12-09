const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['Crime', 'Mystery', 'Fantasy', 'Romance', 'Science Fiction', 'Western', 'Horror', 'Inspirational', 'Non-Fiction', 'Biography']
    },
    summary: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Story', storySchema);