var jwt = require("jsonwebtoken");
const JWT_SECRET = "Raushanislege!@####nd"; //secret key for jwt token

const fetchuser = (req, res, next) => {
    //Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Pleasee authenticate a valid user token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; //here we got a object. and inside object we got the id of user
        next(); // this nex() is compulsory
    }
    catch (e) {
        res.status(401).send({ error: "Server Error" });
    }
}

module.exports = fetchuser;