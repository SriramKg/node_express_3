const jwt = require('jsonwebtoken');

async function validateUser(req, res, next) {
    const secret = process.env.SECRET_JWT;
    if(!req.headers.authorization) {
        return res.status(401).json({message: "You are Unauthorized"});
    }
    else {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: "You are Unauthorized"});
        }
        else {
            jwt.verify(token, secret, (err, data) => {
                if(err) {
                    return res.status(401).json({message: "Unauthorized! Please Login again."});
                }
                else {
                    req.username = data.username;
                    req.roles = data.roles;
                    req.email = data.email;
                    req.password = data.password;
                    req.gender = data.gender;
                    req.number = data.number;
                    next();
                }
            })
        }
    }

}
module.exports = validateUser;