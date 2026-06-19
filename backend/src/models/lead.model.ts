import mongoose, { Document, Schema } from "mongoose"

export interface ILead extends Document {
    name: string
    email: string
    phone?: string
    source: "website" | "facebook" | "google" | "instagram" | "referral" | "other"
    status: "new" | "contacted" | "qualified" | "converted" | "lost"
    score: number
    createdAt: Date
    updatedAt: Date
}

const leadSchema = new Schema<ILead>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            trim: true
        },

        source: {
            type: String,
            enum: ["website", "facebook", "google", "instagram", "referral", "other"],
            default: "website"
        },

        status: {
            type: String,
            enum: ["new", "contacted", "qualified", "converted", "lost"],
            default: "new"
        },

        score: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<ILead>("Lead", leadSchema)