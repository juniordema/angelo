import mongoose, { Document, Schema } from "mongoose"

export interface IArticle extends Document {
    title: string
    slug: string
    excerpt?: string
    content: string
    coverImage?: string
    category?: string
    tags: string[]
    author: string
    status: "draft" | "published" | "scheduled" | "archived"
    views: number
    shares: {
        whatsapp: number
        facebook: number
        linkedin: number
        twitter: number
        copyLink: number
    }
    publishedAt?: Date
    scheduledAt?: Date
    createdAt: Date
    updatedAt: Date
    titleEn?: string
    excerptEn?: string
    contentEn?: string
    categoryEn?: string
    tagsEn: string[]
}

const articleSchema = new Schema<IArticle>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        titleEn: {
            type: String,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        excerpt: {
            type: String,
            trim: true
        },

        excerptEn: {
            type: String,
            trim: true
        },

        content: {
            type: String,
            required: true
        },

        contentEn: {
            type: String
        },

        coverImage: {
            type: String
        },

        category: {
            type: String,
            trim: true
        },

        categoryEn: {
            type: String,
            trim: true
        },

        tags: {
            type: [String],
            default: []
        },

        tagsEn: {
            type: [String],
            default: []
        },

        author: {
            type: String,
            default: "Admin"
        },

        status: {
            type: String,
            enum: ["draft", "published", "scheduled", "archived"],
            default: "draft"
        },

        views: {
            type: Number,
            default: 0
        },

        shares: {
            whatsapp: { type: Number, default: 0 },
            facebook: { type: Number, default: 0 },
            linkedin: { type: Number, default: 0 },
            twitter: { type: Number, default: 0 },
            copyLink: { type: Number, default: 0 }
        },

        publishedAt: {
            type: Date
        },

        scheduledAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IArticle>("Article", articleSchema)