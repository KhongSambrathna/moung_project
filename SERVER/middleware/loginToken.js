import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Save user info in request for next middleware
        next();
    });
};
