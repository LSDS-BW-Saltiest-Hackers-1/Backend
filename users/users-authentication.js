const jwt = require("jsonwebtoken");

module.exports = (req, res , next) => {
    const token = req.headers.authorization;
    
    if(token) {
        const secret = process.env.JWT_SECRET || "secretmysteryyouwillneverfind";
        
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                // Token is not valid
                res.status(401).json({ message: "No token found, please login" });
            } else {
                // Token is valid
                req.jwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({ message: "Not logged in, cannot access." });
    }
}