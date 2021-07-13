var userModel = require('../model/user_model');
//Register purpose
exports.register = (req, callback) => {
    userModel.register(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.login = (req, callback) => {
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.posts = (req, callback) => {
    userModel.userPost(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.fetchPosts = (req, callback) => {
    userModel.fetchPosts(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.fetchByIdPost = (req, callback) => {
    userModel.fetchByIdPost(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.updatePostById = (id, dataObj, callback) => {
    userModel.updatePostById(id, dataObj, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.deletePostById = (id, callback) => {
    userModel.deletePostById(id, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}