const express = require('express');
const router = express.Router();
const Form = require('../../models/Form');
const getAge = require('get-age');


//Get all the users
router.get('/', (req, res, next) => {
    Form.find({}, null, {sort: {firstname: 1}}, function (err, forms) {
            if (err) {
                console.log(err);
            }
            console.log(forms);
        })
    .then((forms) => {
        res.json(forms);
    })
    .catch(err => console.log(err))
});


// Create  a user
router.post('/add', (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const dob = req.body.dob;
    const address = req.body.address;
    const university = req.body.university;
    const course = req.body.course;
    const cgpa = req.body.cgpa;
    newForm = new Form({
        firstname: firstname,
        lastname: lastname,
        email: email,
        dob: dob,
        address: address,
        university: university,
        course: course,
        cgpa: cgpa,
    });
    newForm.save()
    .then(form => {
        res.json(form);
        res.json({success : true})
    })
    .catch(err => console.log(err));
});

// to update a user
router.put('/update/:id', (req, res, next) => {
//Grab the id of the user
let id = req.params.id;
// find the user by id from the databasse
    Form.findById(id)
    .then(form => {
        users.firstname = req.body.firstname;
        users.lastname = req.body.lastname;
        users.email = req.body.email;
        users.dob = req.body.dob;
        users.address = req.body.address;
        users.university = req.body.university;
        users.course = req.body.course;
        users.cgpa = req.body.cgpa;
        users.save()
        .then(form =>{
            res.send({message: 'Updated succesfully',
            status: 'sucess',
            form: form})

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    
});
// make delete request
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Form.findById(id)
    .then(form => {
        form.delete()
        .then(form =>{
            res.send({message: 'Deleted succesfully',
            status: 'sucess',
            form: form})

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


// Get all one user
router.get('/single/:id', (req, res, next) => {
//Grab the id of a user
    let id = req.params.id;
    Form.findById(id)
    .then((form) => {
        res.json(form);
    })
    .catch(err => console.log(err))
});

// ROUTES
// app.get('/',function(req,res){
//   res.sendFile(__dirname + '/Application-form.vue');
 
// });

// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file)
  
// })

module.exports = router;