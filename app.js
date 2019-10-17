const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer  = require('multer')
const nodemailer = require('nodemailer')
const upload = multer({ dest: 'uploads/' }) 

const app = express();
const db = require('./config/db').database;

// Database Connection

mongoose.connect(db, {
    useNewUrlParser: true
})
.then(() => {
    console.log('Database Connected Successfully')
})
.catch((err) => {
    console.log('Unable to connect with the database', err)
});

// Defining the PORT
const port = process.env.PORT || 3000;

// Initialize cors Middleware
app.use(cors());


app.use('/uploads', express.static('uploads'));
// Initialize BodyParser Middleware
app.use(bodyParser.json());


// Initialize public directory
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Application-form.vue');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('myFile'), (req, res) => {
  res.redirect('/');
});


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
});

const adminRoutes = require('./routes/apis/admin');
const userRoutes = require('./routes/apis/user');
const formRoutes = require('./routes/apis/form');
const recruitRoutes = require('./routes/apis/recruit');
const createRoutes = require('./routes/apis/create');


app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);0
app.use('/api/form', formRoutes);
app.use('/recruit', recruitRoutes);
app.use('/attach', createRoutes);


const questionRoutes = require('./routes/apis/question');
const questionSetRoutes = require('./routes/apis/questionSet');
const ApplicantAnsRoutes = require('./routes/apis/applicantAns');

app.use('/api/admin', adminRoutes);
app.use('/applicant', userRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/questionset', questionSetRoutes);
app.use('/api/applicantans', ApplicantAnsRoutes);

app.listen(port, () => {
    console.log('server started on Port', port)
});