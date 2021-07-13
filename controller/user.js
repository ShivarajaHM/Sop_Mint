var userService = require('../services/user_services');
var { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')


module.exports.register = (req, res) => {
    body('name', 'Name is not valid').isLength({ min: 3 }).isAlpha();
    body('email', 'Email is not valid').isEmail();
    body('password', 'password is not valid').isLength({ min: 4 });
    let response = {}
    if (req.body.password) {
        let password = req.body.password
        if (password.length <= 4) {
            response.success = false;
            response.message = 'Password length must be at least 4';
            return res.status(401).send(response);
        }
    } else {
        response.success = false;
        response.message = 'Password is must';
        return res.status(401).send(response);
    }

    var errors = validationResult(body);
    let result = JSON.stringify(errors)

    if (result.errors) {
        response.success = false;

        response.error = errors;
        return res.status(401).send(response);
    } else {
        userService.register(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    }
};

module.exports.login = (req, res) => {
    body('email', 'Email is not valid').isEmail();
    body('password', 'password is not valid').isLength({ min: 4 });
    var secret = "developer";
    var errors = validationResult(body);
    let result = JSON.stringify(errors)
    var response = {};
    if (result.errors) {
        response.success = false;
        response.error = errors;
        return res.status(401).send(response);
    } else {
        userService.login(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                var token = jwt.sign({ email: req.body.email, id: data[0]._id }, secret, { expiresIn: 86400000 });
                return res.status(200).send({
                    message: data,
                    "token": token
                });
            }
        });
    }

};

module.exports.posts = (req, res) => {
    body('title', 'title is not valid').isLength({ min: 3 }).isAlpha();

    let response = {}

    var errors = validationResult(body);
    let result = JSON.stringify(errors)

    if (result.errors) {
        response.success = false;

        response.error = errors;
        return res.status(401).send(response);
    } else {
        userService.posts(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    }
};

module.exports.fetchPosts = (req, res) => {
    let email = req.body.email;
    if (email.length != 0) {
        userService.fetchPosts(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    } else {
        return res.status(401).send('Invalid credentials')
    }
};

module.exports.fetchPost = (req, res) => {
    let path = req.path
    var pathArray = path.split('/')
    let email = req.body.email;
    if (email.length != 0) {
        let id = pathArray[2];
        userService.fetchByIdPost(id, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    } else {
        return res.status(401).send('Invalid credentials')

    }
};

module.exports.updatePost = (req, res) => {
    let path = req.path
    var pathArray = path.split('/')
    let email = req.body.email;
    let updatedData = req.body;
    if (email.length != 0) {
        let id = pathArray[2];
        userService.updatePostById(id, updatedData, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    } else {
        return res.status(401).send('Invalid credentials')

    }
};

module.exports.deletePost = (req, res) => {
    let path = req.path
    var pathArray = path.split('/')
    let email = req.body.email;

    if (email.length != 0) {
        let id = pathArray[2];
        userService.deletePostById(id, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    } else {
        return res.status(401).send('Invalid credentials')

    }
};

