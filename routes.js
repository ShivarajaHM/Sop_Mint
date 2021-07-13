const controller = require('./controller/user')
const multer = require("multer");
const upload = multer({dest: 'uploads'});
const auth = require('./auth/auth')

const express = require('express');
const router = express.Router();

try{
    router.post('/login',controller.login);
    router.post('/register', controller.register);
    router.post('/upload', upload.single('photo'), (req, res) => {
            if(req.file) {
                res.json(req.file);
            }
            else throw 'error';
        });
    router.post('/posts',auth,controller.posts);
    router.get('/posts',auth,controller.fetchPosts);
    router.get('/post/:id',auth,controller.fetchPost);
    router.put('/post/:id',auth,controller.updatePost);
    router.delete('/post/:id',auth,controller.deletePost);
}
catch(err)
{
    console.log("err due to controller");
}



module.exports = router;