import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model"

const generateToken = (userId: string, role: string): string => {
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
        throw new Error("JWT_SECRET est introuvable dans le fichier .env")
    }

    return jwt.sign(
        { id: userId, role },
        jwtSecret,
        { expiresIn: "7d" }
    )
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                message: "Email et mot de passe sont obligatoires"
            })
            return
        }

        const user = await User.findOne({ email })

        if (!user) {
            res.status(401).json({
                message: "Email ou mot de passe incorrect"
            })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            res.status(401).json({
                message: "Email ou mot de passe incorrect"
            })
            return
        }

        if (user.role !== "admin") {
            res.status(403).json({
                message: "Accès refusé : admin uniquement"
            })
            return
        }

        const token = generateToken(user._id.toString(), user.role)

        res.status(200).json({
            message: "Connexion admin réussie",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur"
        })
    }
}

export const me = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
        message: "Utilisateur connecté",
        user: req.user
    })
}