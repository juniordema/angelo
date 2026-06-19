import mongoose, { Document, Schema } from "mongoose"

export interface ISettings extends Document {
    clinicName: string
    phone: string
    email: string
    address: string
    createdAt: Date
    updatedAt: Date
}

const settingsSchema = new Schema<ISettings>(
    {
        clinicName: {
            type: String,
            required: true,
            trim: true,
            default: "Clinique Angelo"
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<ISettings>("Settings", settingsSchema)
