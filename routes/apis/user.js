const express = require('express');
const dotenv = require("dotenv");
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/user');
// const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

router.get('/', (req, res, next) => {
User.find()

.then((user) => {
res.json();
})
.catch(err => console.log(err))
});

 router.get('/single/:id', (req, res, next) => {
        //Grab the id of each applicant
        let id = req.params.id;
        User.findById(id)
            .then((user) => {
                res.json(user);
            
            })
            .catch(err => console.log(err))
    });


router.post('/signup',(req, res, next) => {
    let error = [];
    if (req.body.password != req.body.confirm_password){
    return res.status(400).json({
    message:"Password do not match"
    });
    if(req.body.password < 4){
        return res.status(401).json({
            message:"password must be at least 4 characters"
    });
    }

    // else {
    //     res.status(201).json({
    //     message: ' signup successfully',
    // });
    // }
}

User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
            message:'Mail already exist'
    });
    } else{
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if (err) {
            return res.status(500).json({
            error: err
        });
    } else{
    const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    phone_number:req.body.phone_number
});
    user
    .save()
    .then(result => {
    console.log(result);
    res.status(201).json({
message: ' signup successfully',
user:user,

});

})
.catch(err =>{
console.log(err);
res.status(500).json({
error: err
});
});
}
});
}
})


});

router.post("/login", (req, res, next) => {

    User.find({email: req.body.email})
        .exec()
        .then(user => {
         console.log("USER ==> ", user)
        if (user.length < 1 ){
             return res.status(403).json({
            message: 'Authentication Failed, please enter correct email and password'
        });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
    if (err){
        return res.status(403).json({
        message: 'Authentication Failed, please enter correct email and password'
    });
}
    if (result) {
    const token = jwt.sign(
    {
    email: user[0].email,
    userId: user[0]._id
    }, 
    process.env.JWT_KEY, 
    {
    // expiresIn: "1h"
    }
);

    return res.status(200).json({
        message: 'Login successfull',
        token: token,
        user: user[0]
        
    });
}
    res.status(401).json({
        message: 'Verification failed, pls enter correct email and password'
    });
    });
    })
    .catch(err =>{
    console.log(err);
    res.status(500).json({
    error: err
    });
});


});




router.delete('/:userId', (req, res, next) =>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
        message: 'User deleted'
    })
})
    .catch(err =>{
    console.log(err);
    res.status(500).json({
    error: err
    });
});
});

module.exports = router;