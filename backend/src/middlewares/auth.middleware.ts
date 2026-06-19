import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface JwtPayload {
    id: string
    role: "user" | "admin"
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

export const protect = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Non autorisé, token manquant" })
            return
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload

        req.user = decoded

        next()
    } catch (error) {
        res.status(401).json({ message: "Non autorisé, token invalide" })
    }
}