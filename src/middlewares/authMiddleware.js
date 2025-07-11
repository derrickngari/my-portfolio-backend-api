import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ _id: decode.id }).select('-password');
        next();
    } catch (error) {
        console.log('Authmiddleware error: ', error.message);
        res.status(401).json({ message: "Unauthorized, token failed" });
    }
}

export default authMiddleware;