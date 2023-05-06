const jwt = require("jsonwebtoken");
const User = require("../models/user");

const admin = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).json({ msg: "No auth token" });

        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if (!verified) return res.status(401).json({ msg: "Token not valid" });

        const user = await User.findById(verified.id);
        if(user.type == "user" || user.type == "seller"){
            return res.status(401).json({ msg: "Access Denied since not admin"});
        }

        req.user = verified.id;
        req.token = token;
        next();
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = admin