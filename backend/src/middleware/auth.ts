import { decode } from "../utils/jwt.utils";
import { Request, Response, NextFunction } from "express";
import log from "../logger/logger";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = decode(token);

        req.body.user = decoded;
        
    }catch (error) {
        return res.status(401).send("Invalid token");
    }

    next();
}