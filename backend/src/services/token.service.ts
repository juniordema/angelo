import jwt from "jsonwebtoken"

export interface TokenPayload {
    id: string
    role: "user" | "admin"
}

export const generateToken = (payload: TokenPayload): string => {
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
        throw new Error("JWT_SECRET est introuvable dans le fichier .env")
    }

    return jwt.sign(payload, jwtSecret, {
        expiresIn: "7d"
    })
}