const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OutlineNotesSchema = new Schema({
    body: String,
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Outline',
        required: true
    }
})

module.exports = mongoose.model('OutlineNotes', OutlineNotesSchema);