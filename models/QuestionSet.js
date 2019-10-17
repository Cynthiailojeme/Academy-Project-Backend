const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);
const {Types: {ObjectId}} = mongoose;
const validateObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;

const QuestionSetSchema = mongoose.Schema({
  nameOfSet: {
    type: String,
  },
  quiz: {
    type: [
        {question: {
          type: String,
          required: true
        },
      img: { 
          type: String
        },
      correctAnswer: {
            type: String,
            default: undefined,
            required: true
          },
      options: {
            type: [],
            default: undefined,
            required: true,
            validate: {
              validator: function(value) {
                return value && value.length === 4;
              },
            message: 'Answer options should be 4.'
        },
      }
      },
    ]
  },
  duration: {
      type: String,
      required: true
  },
  dateOfAsess: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QuestionSetSchema', QuestionSetSchema);