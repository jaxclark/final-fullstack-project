const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outlineSchema = new Schema({
    title: String,
    partOne: String,
    partTwo: String,
    partThree: String,
    partFour: String,
    partFive: String,
    partSix: String,
    partSeven: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Outline', outlineSchema);