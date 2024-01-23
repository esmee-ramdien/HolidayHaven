import { model } from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const User = model("Users");

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: `Access denied ${token}` });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        } else {
            req.user = user;
            return next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;
