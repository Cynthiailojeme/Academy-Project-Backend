const mongoose = require('mongoose');

const createSchema = mongoose.Schema({

    image: {
        type: String,

    },

    // file:{ data: Buffer, contentType: String },

    link: {
        type: String,
        required: false,

    },

    application_date: {
        type: String,
        required: false,

    },

    batch_id: {
        type: String,
        required: false,
    },

    instruction: {
        type: String,
        required: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

const create = module.exports = mongoose.model('create', createSchema);





