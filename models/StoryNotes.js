const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoryNotesSchema = new Schema({
    body: String,
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    }
})

module.exports = mongoose.model('StoryNotes', StoryNotesSchema);