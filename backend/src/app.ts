import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import authRoutes from "./routes/auth.routes"
import contentRoutes from "./routes/content.routes"
import marketingRoutes from "./routes/marketing.routes"
import { notFound, errorHandler } from "./middlewares/error.middleware"

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({
        message: "API Clinic Backend fonctionne"
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/content", contentRoutes)
app.use("/api/admin/marketing", marketingRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
