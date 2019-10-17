const express = require('express');
const router = express.Router();
const Question = require('../../models/Question');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.fieldname + path.extname(file.originalname));    
    }
  })
  
const upload = multer({ storage: storage });


router.get("/all", (req, res, next) => {
  Question.find()
    .select("quiz options img correctAnswer")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        questions: docs.map(doc => {
          return {
            quiz: doc.quiz,
            options: doc.options,
            img: doc.img,
            correctAnswer: doc.correctAnswer,
            _id: doc._id
          };
        })
      };
      if (docs.length >= 0) {
      res.status(200).json(response);
        } else {
            res.status(404).json({
                message: 'No entries found'
            });
        } 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Create a Question
router.post('/add', upload.single('image'), (req, res, next) => {
  console.log(req.file)
    const quiz = req.body.quiz;
    const options = req.body.options;
    const correctAnswer = req.body.correctAnswer;
    const image = req.file.path;

    newQuestion = new Question({
        image: image,
        quiz: quiz,
        options: options,
        correctAnswer: correctAnswer,
        timestamps: true
    });
    newQuestion.save()
    .then(question => {
        res.status(200).json({
          message: "Uploaded successfully",
          question
        }); 
    })
    .catch(err => console.log(err));
});


router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Question.findById(id)
    .select('quiz options img correctAnswer')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            question: doc
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


// make delete request
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Question.findById(id)
  .then(question => {
      question.delete()
      .then(question =>{
          res.send({message: 'Question deleted succesfully',
          status: 'success',
          question: question})

      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router;