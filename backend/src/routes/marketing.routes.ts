import express from "express"
import {
getMarketingStats,
    createCampaign,
    getCampaigns,
    updateCampaign,
    deleteCampaign,
    getLeads
} from "../controllers/marketing.controller"

import { protect } from "../middlewares/auth.middleware"
import { requireAdmin } from "../middlewares/role.middleware"

const router = express.Router()

router.get("/stats", protect, requireAdmin, getMarketingStats)
router.get("/leads", protect, requireAdmin, getLeads)
router.post("/campaigns", protect, requireAdmin, createCampaign)
router.get("/campaigns", protect, requireAdmin, getCampaigns)
router.put("/campaigns/:id", protect, requireAdmin, updateCampaign)
router.delete("/campaigns/:id", protect, requireAdmin, deleteCampaign)

export default router