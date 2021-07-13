const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var ObjectId = require('mongodb').ObjectId;

// create instance of Schema
var mongoSchema = mongoose.Schema;
var userSchema = new mongoSchema({
    "name": { type: String, required: [true, "name is required"] },
    "email": { type: String, required: [true, "Email is required"] },
    "password": { type: String, required: [true, "password is required"] },
    "image_url": { type: String, required: [false, "not mandiatory"] }
}, {
    timestamps: true
});

var postSchema = new mongoSchema({
    "email": { type: String, required: [true, "Email is required"] },
    "title": { type: String, required: [true, "title is required"] },
    "description": { type: String },
    "image_url": { type: String, required: [false, "not mandiatory"] }
}, {
    timestamps: true
});


function usermodel() {
}
var user = mongoose.model('user', userSchema);
var post = mongoose.model('post', postSchema);

function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

usermodel.prototype.register = (body, callback) => {
    console.log('Mode...........', body);
    user.find({ 'email': body.email }, (err, data) => {
        if (err) {
            console.log("Error in register user schema ");
            return callback(err);
        } else if (data.length > 0) {
            response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
            return callback(response);
        }
        else {
            const newUser = new user({

                "name": body.name,
                "email": body.email,
                "password": hash(body.password)
            });
            newUser.save((err, result) => {
                if (err) {
                    console.log("error came");
                    console.log("error in model file", err);
                    return callback(err);
                } else {
                    console.log(body.name);
                    console.log("data save successfully", result);
                    console.log("registered successfully");
                    callback(null, result);
                    console.log("no return statements ..registered successfully");

                }
            })
        }
    });

}

usermodel.prototype.login = (body, callback) => {
    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            return callback(err);
        } else if (data.length > 0) {
            bcrypt.compare(body.password, data[0].password, (err, res) => {
                if (err) {
                    return callback(err);
                } else if (res) {
                    return callback(null, data);
                } else {
                    return callback("Incorrect password").status(500);
                }
            });
        } else {
            return callback("Invalid User");
        }
    });
}

usermodel.prototype.userPost = (body, callback) => {

    if (body) {
        const newPost = new post({
            "title": body.title,
            "description": body.description,
            "email": body.email,
            "image_url": body.image_url
        });

        newPost.save((err, result) => {
            if (err) {
                return callback(err);
            } else {
                callback(null, result);
            }
        })
    } else {
        let response = { "error": true, "message": "Bad Request", "errorCode": 400 };
        return callback(response);
    }

}

usermodel.prototype.fetchPosts = (body, callback) => {
    if (!body) {
        let response = { "error": true, "message": "Bad Request", "errorCode": 400 };
        return callback(response);
    } else {
        post.find({ 'email': body.email }, (err, data) => {
            if (err) {
                return callback(err)
            }
            else {
                callback(null, data);
            }
        })
    }

}

usermodel.prototype.fetchByIdPost = (id, callback) => {
    if (!id) {
        let response = { "error": true, "message": "Bad Request", "errorCode": 400 };
        return callback(response);
    } else {
        post.findOne({ _id: ObjectId(id) }, (err, data) => {
            if (err) {
                return callback(err)
            }
            else {
                callback(null, data);
            }
        })
    }

}

usermodel.prototype.updatePostById = (id, data, callback) => {
    if (!id) {
        let response = { "error": true, "message": "Bad Request", "errorCode": 400 };
        return callback(response);
    } else {
        post.findOneAndUpdate({ _id: ObjectId(id) }, data, (err, data) => {
            if (err) {
                return callback(err)
            }
            else {
                callback(null, data);
            }
        })
    }
}

usermodel.prototype.deletePostById = (id, callback) => {
    if (!id) {
        let response = { "error": true, "message": "Bad Request", "errorCode": 400 };
        return callback(response);
    } else {
        post.findOneAndDelete({ _id: ObjectId(id) })
            .then(deletedDocument => {
                if (deletedDocument) {
                    console.log(`Successfully deleted document that had the form: ${deletedDocument}.`)
                } else {
                    console.log("No document matches the provided query.")
                }
                callback(deletedDocument)
            })
            .catch(err => console.error(`Failed to find and delete document: ${err}`))
    }

}

module.exports = new usermodel();
