import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGO_URI

        if (!mongoUri) {
            throw new Error("MONGO_URI est introuvable dans le fichier .env")
        }

        await mongoose.connect(mongoUri)

        console.log("MongoDB connecté avec succès")
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erreur de connexion MongoDB :", error.message)
        } else {
            console.error("Erreur inconnue MongoDB :", error)
        }

        process.exit(1)
    }
}

export default connectDB