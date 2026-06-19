import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import connectDB from "../config/db"
import User from "../models/user.model"

dotenv.config()

const createAdmin = async (): Promise<void> => {
    try {
        await connectDB()

        const email = "admin@clinic.com"
        const password = "Admin@123"

        const hashedPassword = await bcrypt.hash(password, 10)

        const existingAdmin = await User.findOne({ email })

        if (existingAdmin) {
            existingAdmin.password = hashedPassword
            existingAdmin.role = "admin"
            existingAdmin.name = "Admin"

            await existingAdmin.save()

            console.log("Admin mis à jour avec succès")
            process.exit(0)
        }

        await User.create({
            name: "Admin",
            email,
            password: hashedPassword,
            role: "admin"
        })

        console.log("Admin créé avec succès")
        process.exit(0)
    } catch (error) {
        console.error("Erreur création admin :", error)
        process.exit(1)
    }
}

createAdmin()