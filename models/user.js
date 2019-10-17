const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // first_name:{
    //     type: String,
    //     required: false, 
    // },
    // last_name:{
    //     type: String,
    //     required: false,
    // },

    token:{
        type:String
    },

    //  tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],

    email:{
        type: String,
        required: true
        // unique: true,
        // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    // phone_number:{
    //     type: String,
    //     required: false,
    // },
    // appply_time:{
    //     type: Date,
    //     default:Date.now,

    // },

    password:{
        type: String,
        required: true
    },

    confirm_password:{
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now
    }

    });

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
        
const user = module.exports = mongoose.model('user', userSchema);