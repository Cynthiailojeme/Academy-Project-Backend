const express = require('express');
const multer = require('multer')
const router = express.Router();
const Create = require('../../models/create');
// const path = require('path');

// var storage = multer.diskStorage({
// destination: 'uploads',
// filename: function (req, file, cb) {
// cb(null, Date.now() + file.fieldname + path.extname(file.originalname)); 
// }
// })
// const upload = multer({
// dest: './uploads/'

// })

// const upload = multer({ storage: storage });



router.get('/', (req, res, next) => {
    Create.find()
        .then((posts) => {
            res.json(posts);
        })
        .catch(err => console.log(err))

});


router.get('/single/:id', (req, res, next) => {
    //Grab the id of each applicant
    let id = req.params.id;
    Create.findById()
        .then((create) => {
            res.json(create);

        })
        .catch(err => console.log(err))
});




router.post('/upload', (req, res) => {
    // res.json({
    // // file:req.file,
    // // link:req.body.link,
    // // appliction_closure_date:req.body.appliction_closure_date,
    // // batch_id:req.body.batch_id,
    // // instruction: req.body.instruction

    // });
    const image = req.body.image;

    // const image = req.image;
    const link = req.body.link;
    const application_date = req.body.application_date;
    const batch_id = req.body.batch_id;
    const instruction = req.body.instruction;


    // const file = req.body.file;
    // const link = req.body.link;
    // const appliction_closure_date = req.body.appliction_closure_date;
    // const batch_id = req.body.batch_id;
    // const instruction = req.body.instruction;


    newCreate = new Create({
        image: image,
        link: link,
        application_date: application_date,
        batch_id: batch_id,
        instruction: instruction

        // file_path: file_path,
        // link: link,
        // appliction_closure_date: appliction_closure_date,
        // batch_id: batch_id,
        // instruction: instruction,



    });
    newCreate.save()
        .then(create => {
            res.json(create)
        })
        .catch(err => console.log(err));

});

router.delete('/delete', (req, res, next) => {
    Create.remove()
        // .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;