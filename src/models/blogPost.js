const { Schema, model } = require('mongoose');

const blogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio.']
    },
    body: {
        type: String,
        required: [true, 'El body es obligatorio.']
    },
    author: {
        type: String,
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = model('blogPost', blogPostSchema);
