import { Request, Response } from "express"
import Campaign from "../models/compaign.model"
import Lead from "../models/lead.model"

export const getMarketingStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalCampaigns = await Campaign.countDocuments()
        const activeCampaigns = await Campaign.countDocuments({ status: "active" })
        const totalLeads = await Lead.countDocuments()
        const convertedLeads = await Lead.countDocuments({ status: "converted" })

        const conversionRate =
            totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0

        res.status(200).json({
            totalCampaigns,
            activeCampaigns,
            totalLeads,
            convertedLeads,
            conversionRate
        })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const createCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaign = await Campaign.create(req.body)

        res.status(201).json({
            message: "Campagne créée avec succès",
            campaign
        })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 })

        res.status(200).json(campaigns)
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!campaign) {
            res.status(404).json({ message: "Campagne introuvable" })
            return
        }

        res.status(200).json({
            message: "Campagne modifiée avec succès",
            campaign
        })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id)

        if (!campaign) {
            res.status(404).json({ message: "Campagne introuvable" })
            return
        }

        res.status(200).json({
            message: "Campagne supprimée avec succès"
        })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}
export const getLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 })

        res.status(200).json(leads)
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}