const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);

const formSchema = mongoose.Schema({
    
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    cgpa: {
        type: String,
        required: true
    }
});

const Form = module.exports = mongoose.model('Form', formSchema);