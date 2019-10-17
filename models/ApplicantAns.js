const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);
const {Types: {ObjectId}} = mongoose;
const validateObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;

const ApplicantAnsSchema = mongoose.Schema({
    score: {
      type: Number
    },
    takenassessment: {
      type: Boolean,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    token: {
      type: String
    },
    // pushing answers as an array
    setId: {
      type: String,
    },
    answers: {
      type: Object,
      ans: {
        type: String
      },
      question_id: {
        type: String
      }
    },
  },
  {
    timestamps: true
  });
  
  // ApplicantAnsSchema.pre('save', function updateTotalScore(next) {
  //   // update total score of the candidate here based on the correct questionAnswers and
  //   // questionSet.
  //   next();
  // });
  
  // ApplicantAnsSchema.pre('save', function updateIsPassed(next) {
  //   // update the isPassed based on the totalScore obtained by the candidate.
  //   next();
  // });
  
module.exports = mongoose.model('ApplicantAns', ApplicantAnsSchema);
  