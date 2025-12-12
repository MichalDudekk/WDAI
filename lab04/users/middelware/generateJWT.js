import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

const generateJWT = (userEmail) => {
    const payload = {
        email: userEmail,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1h",
        algorithm: "HS256",
    });

    return token;
};

export default generateJWT;
