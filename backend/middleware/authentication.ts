import { model } from 'mongoose';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const User = model("Users");

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ eMessage: `Access denied.` });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ eMessage: 'User not authenticated.' });
        } else {
            req.user = user;
            return next();
        }

        JsonWebTokenError
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(404).json({ eMessage: 'Token expired.' });
        } else {
            return res.status(500).json({ eMessage: 'Invalid token.' });
        }
    }
};

export default verifyToken;
