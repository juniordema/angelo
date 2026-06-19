import bcrypt from "bcryptjs"
import User from "../models/user.model"
import { generateToken } from "./token.service"

interface RegisterInput {
    name: string
    email: string
    password: string
}

interface LoginInput {
    email: string
    password: string
}

export const registerUser = async ({ name, email, password }: RegisterInput) => {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new Error("Cet email est déjà utilisé")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user"
    })

    const token = generateToken({
        id: user._id.toString(),
        role: user.role
    })

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}

export const loginUser = async ({ email, password }: LoginInput) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Email ou mot de passe incorrect")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new Error("Email ou mot de passe incorrect")
    }

    const token = generateToken({
        id: user._id.toString(),
        role: user.role
    })

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}