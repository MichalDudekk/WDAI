import jwt from "jsonwebtoken";

// 1. Zdefiniuj swoje tajne dane (klucz)
// W PRAWDZIWEJ APLIKACJI KLUCZ POWINIEN BYĆ POBRANY ZE ZMIENNEJ ŚRODOWISKOWEJ!
const SECRET_KEY = "super-tajny-klucz-nigdy-nie-udostepniaj";

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
