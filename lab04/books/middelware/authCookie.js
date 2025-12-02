import jwt from "jsonwebtoken";

const SECRET_KEY = "super-tajny-klucz-nigdy-nie-udostepniaj";

const authenticateCookie = (req, res, next) => {
    const cookie = req.cookies["auth_token"];

    if (!cookie) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        // console.log(1);
        const decoded = jwt.verify(cookie, SECRET_KEY);
        // console.log(2);
        req.user = decoded;
        if (req.user.email != req.body.email) {
            console.log("DEV: Email in token:", req.user.email);
            throw new Error("DEV: Email in token does not match email in body");
        }

        // Przekazanie żądania dalej
        next();
    } catch (error) {
        // Błędy weryfikacji (expired, invalid signature, etc.)
        return res.status(403).json({ error: "Access denied" });
    }
};

export default authenticateCookie;
