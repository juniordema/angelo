import mongoose, { Document, Schema } from "mongoose"

export interface ICampaign extends Document {
    name: string
    description?: string
    channel: "email" | "social" | "seo" | "ads" | "referral"
    budget: number
    objective: string
    startDate: Date
    endDate?: Date
    status: "draft" | "scheduled" | "active" | "completed" | "paused"
    createdAt: Date
    updatedAt: Date
}

const campaignSchema = new Schema<ICampaign>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        channel: {
            type: String,
            enum: ["email", "social", "seo", "ads", "referral"],
            required: true
        },

        budget: {
            type: Number,
            required: true,
            default: 0
        },

        objective: {
            type: String,
            required: true,
            trim: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date
        },

        status: {
            type: String,
            enum: ["draft", "scheduled", "active", "completed", "paused"],
            default: "draft"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<ICampaign>("Campaign", campaignSchema)