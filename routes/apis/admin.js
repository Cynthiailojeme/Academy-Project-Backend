const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../../models/admin');

router.post('/signup', (req, res, next) => {
    Admin.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if (admin.length >= 1) {
                return res.status(409).json({
                    message: 'Email exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const admin = new Admin({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        admin
                        .save()
                        .then(result => {
                            res.status(201).json({
                                message: 'Admin created'
                            });
                        })
                        .catch(err => console.log(err)); 
                    }
                });
            }
        }); 
});

router.post("/login", (req, res, next) => {
    console.log(req.body)
    Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
        console.log(admin)
        if (admin.length < 1) {
            return res.status(401).json({
                message: 'Wrong email or password'
            });
        }
        bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Wrong email or password'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: admin[0].email,
                    adminId: admin[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: "24hrs"
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    admin: admin[0],
                    token: token
                });
            }
            res.status(401).json({
                message: 'Wrong email or password'
            });
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;