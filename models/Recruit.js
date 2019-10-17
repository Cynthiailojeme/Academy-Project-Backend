const mongoose = require('mongoose');

const RecruitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // file{
    // data: Buffer, contentType: String
    // }
    image: {
        type: String
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true
    },

    date_of_birth: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    university: {
        type: String,
        required: true
    },

    course_of_study: {
        type: String,
        required: true
    },

    cgpa: {
        type: Number,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    password: {
        type: String,
        required: true
    },

    confirm_password: {
        type: String,
        required: false,
    },

    // user:{
    // type:mongoose.Schema.Types.ObjectId,
    // ref: 'user',

    // required: false

    // },



});



const Recruit = module.exports = mongoose.model('Recruit', RecruitSchema);