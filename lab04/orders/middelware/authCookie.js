import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateCookie = (req, res, next) => {
    const cookie = req.cookies["auth_token"];

    if (!cookie) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        // Sprawdzenie czy token pasuje do emaila z body zapytania
        const decoded = jwt.verify(cookie, SECRET_KEY);
        req.user = decoded;
        if (req.user.email != req.body.email) {
            // console.log("DEV: Email in token:", req.user.email);
            throw new Error("DEV: Email in token does not match email in body");
        }

        // Przekazanie żądania dalej
        next();
    } catch (error) {
        // Błędy weryfikacji
        return res.status(403).json({ error: "Access denied" });
    }
};

export default authenticateCookie;
