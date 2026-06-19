import { Request, Response } from "express"
import Settings from "../models/settings.model"

const DEFAULT_SETTINGS = {
    clinicName: process.env.CLINIC_NAME || "Clinique Angelo",
    phone: process.env.CLINIC_PHONE || "+237 6 90 83 69 01",
    email: process.env.CLINIC_EMAIL || "contact@angeloclinic.cm",
    address:
        process.env.CLINIC_ADDRESS ||
        "Quartier Logpom, en face de Gar Bon Bar, Douala, Cameroun"
}

export const getSettings = async (
    req: Request,
    res: Response
) => {
    const settings = await Settings.findOne()

    if (!settings) {
        const createdSettings = await Settings.create(DEFAULT_SETTINGS)
        res.json(createdSettings)
        return
    }

    res.json(settings)
}

export const updateSettings = async (
    req: Request,
    res: Response
) => {
    const payload = {
        clinicName: req.body.clinicName ?? DEFAULT_SETTINGS.clinicName,
        phone: req.body.phone ?? DEFAULT_SETTINGS.phone,
        email: req.body.email ?? DEFAULT_SETTINGS.email,
        address: req.body.address ?? DEFAULT_SETTINGS.address
    }

    const settings = await Settings.findOneAndUpdate(
        {},
        payload,
        {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true
        }
    )

    res.json(settings)
}
