import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
}

export const signup =  async(req, res) => {
    const {username, password} = req.body;
    
    try {
        if (!username ||  !password) return res.status(400).json({ message: "Please enter all fields" });

        const user = await User.create({ username, password });
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        res.status(201).json({ message: 'Signup succesful' });
    } catch (error) {
        console.log('Signup controller error: ', error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (!userExists) return res.status(404).json({ message: 'Invalid username or password' });

        const isPassValid = await userExists.comparePassword(password)
        if (!isPassValid) return res.status(400).json({ message: "Invalid username or password" });

        const token = generateToken(userExists._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 *60 *1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });

        res.status(200).json({ username: userExists.username, message: "Login successful" });
    } catch (error) {
        console.log('Login controller error: ', error.message);
        res.status(500).json({ message: "Server Error" });
    }
}