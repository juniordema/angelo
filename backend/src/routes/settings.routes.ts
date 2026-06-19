import express from "express"
import { getSettings, updateSettings } from "../controllers/settings.controller"
import { protect } from "../middlewares/auth.middleware"
import { requireAdmin } from "../middlewares/role.middleware"

const router = express.Router()

router.get("/", getSettings)
router.put("/", protect, requireAdmin, updateSettings)

export default router
