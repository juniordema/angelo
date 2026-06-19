import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import connectDB from "./config/db"
import authRoutes from "./routes/auth.routes"
import contentRoutes from "./routes/content.routes"
import marketingRoutes from "./routes/marketing.routes"
import settingsRoutes from "./routes/settings.routes"
import { notFound, errorHandler } from "./middlewares/error.middleware"

dotenv.config()

const app = express()

connectDB()

app.use(cors())

app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ extended: true, limit: "20mb" }))

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

app.get("/", (req, res) => {
    res.send("API fonctionne")
})

app.use("/api/auth", authRoutes)
app.use("/api/content", contentRoutes)
app.use("/api/admin/marketing", marketingRoutes)
app.use("/api/settings", settingsRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`)
})