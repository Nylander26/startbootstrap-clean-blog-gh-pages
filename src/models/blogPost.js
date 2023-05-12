const { Schema, model } = require('mongoose');

const blogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio.']
    },
    body: {
        type: String,
        required: [true, 'El body es obligatorio.']
    }
}, {
    timestamps: true
})

module.exports = model('blogPost', blogPostSchema);
