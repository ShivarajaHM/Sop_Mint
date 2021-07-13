var jwt = require('jsonwebtoken');
var secret = "developer";
try {
    var auth = function (req, res, next) {
        var token = req.headers["token"];
        var response = {
            'message': "Unauthorised user here "
        };
        jwt.verify(token, secret, function (err, decodedData) {
            if (err) {
                console.log(err)
                return res.status(401).send(response);
            }
            else {
                req.body.email = decodedData.email;
                next();
            }
        });
    }
}
catch (err) {
    return res.status(401).send('Invalid credentials');
}
module.exports = auth;