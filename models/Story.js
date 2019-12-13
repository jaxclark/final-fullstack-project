const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
    },
    summary: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Story', storySchema);