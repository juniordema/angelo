import { Request, Response } from "express"
import Article from "../models/article.model"

import {
    buildFacebookShareUrl,
    buildPublicArticleUrl,
    publishArticleLinkToFacebook
} from "../services/facebook.service"

const SHARE_PLATFORMS = ["whatsapp", "facebook", "linkedin", "twitter", "copyLink"] as const

type SharePlatform = (typeof SHARE_PLATFORMS)[number]

function isSharePlatform(value: unknown): value is SharePlatform {
    return typeof value === "string" && SHARE_PLATFORMS.includes(value as SharePlatform)
}

const HOME_CONTENT = {
    stats: [
        { value: "+10 000", label: "Patients suivis", labelEn: "Patients followed", icon: "fas fa-users", color: "#0A6B5C", bgClass: "bg-primary-50" },
        { value: "15+", label: "Médecins spécialistes", labelEn: "Specialist doctors", icon: "fas fa-user-md", color: "#C9963B", bgClass: "bg-accent-50" },
        { value: "12", label: "Années d'expérience", labelEn: "Years of experience", icon: "fas fa-award", color: "#E74C3C", bgClass: "bg-red-50" },
        { value: "24/7", label: "Urgences disponibles", labelEn: "Emergency available", icon: "fas fa-ambulance", color: "#9B59B6", bgClass: "bg-purple-50" }
    ],
    services: [
        {
            name: "Consultation Générale",
            nameEn: "General Consultation",
            icon: "fas fa-stethoscope",
            imageKey: "consultation",
            desc: "Examens complets, diagnostic et suivi médical général pour toute la famille.",
            descEn: "Full examinations, diagnosis and general medical follow-up for the whole family.",
            fullDescription: "La consultation générale permet d’évaluer l’état de santé du patient, de poser un diagnostic, de prescrire les examens nécessaires et d’assurer un suivi médical adapté.",
            fullDescriptionEn: "General consultation helps assess the patient’s health, make a diagnosis, prescribe necessary tests, and provide personalized medical follow-up.",
            schedule: ["Lundi - Vendredi : 08h00 - 17h00", "Samedi : 08h00 - 13h00", "Urgences : 24h/24"],
            benefits: ["Diagnostic rapide", "Suivi personnalisé", "Orientation vers un spécialiste", "Conseils médicaux adaptés"],
            color: "#0A6B5C",
            bgClass: "bg-primary-50"
        },
        {
            name: "Cardiologie",
            nameEn: "Cardiology",
            icon: "fas fa-heartbeat",
            imageKey: "soin",
            desc: "Bilan cardiaque, ECG, échographie cardiaque et suivi des pathologies cardiovasculaires.",
            descEn: "Cardiac assessment, ECG, cardiac ultrasound and follow-up for cardiovascular conditions.",
            fullDescription: "Le service de cardiologie assure le dépistage, le diagnostic et le suivi des maladies du cœur et des vaisseaux sanguins.",
            fullDescriptionEn: "The cardiology department provides screening, diagnosis, and follow-up for heart and blood vessel diseases.",
            schedule: ["Lundi - Vendredi : 09h00 - 16h00", "Samedi : sur rendez-vous"],
            benefits: ["Bilan cardiaque", "Suivi hypertension", "ECG", "Prévention cardiovasculaire"],
            color: "#E74C3C",
            bgClass: "bg-red-50"
        },
        {
            name: "Pédiatrie",
            nameEn: "Pediatrics",
            icon: "fas fa-baby",
            imageKey: "attente",
            desc: "Soins médicaux adaptés aux nourrissons, enfants et adolescents.",
            descEn: "Medical care tailored to infants, children and adolescents.",
            fullDescription: "La pédiatrie accompagne les enfants dans leur croissance, leur vaccination, leurs consultations de routine et la prise en charge des maladies courantes.",
            fullDescriptionEn: "Pediatrics supports children through growth monitoring, vaccination, routine consultations, and treatment of common illnesses.",
            schedule: ["Lundi - Vendredi : 08h30 - 16h30", "Samedi : 08h00 - 12h00"],
            benefits: ["Suivi croissance", "Vaccination", "Conseils aux parents", "Prise en charge rapide"],
            color: "#3498DB",
            bgClass: "bg-blue-50"
        },
        {
            name: "Gynécologie-Obstétrique",
            nameEn: "Gynecology and Obstetrics",
            icon: "fas fa-female",
            imageKey: "accouchement",
            desc: "Suivi gynécologique, échographies obstétricales, accouchement et planification familiale.",
            descEn: "Gynecological follow-up, obstetric ultrasounds, childbirth and family planning.",
            fullDescription: "Ce service accompagne les femmes pour le suivi gynécologique, la grossesse, les échographies, l’accouchement et la planification familiale.",
            fullDescriptionEn: "This service supports women with gynecological care, pregnancy follow-up, ultrasounds, childbirth, and family planning.",
            schedule: ["Lundi - Vendredi : 08h00 - 17h00", "Accouchement : 24h/24"],
            benefits: ["Suivi grossesse", "Échographies", "Planification familiale", "Accompagnement maternité"],
            color: "#E91E8C",
            bgClass: "bg-pink-50"
        },
        {
            name: "Dermatologie",
            nameEn: "Dermatology",
            icon: "fas fa-allergies",
            imageKey: "pharmacie",
            desc: "Diagnostic et traitement des maladies de la peau, allergies et esthétique dermatologique.",
            descEn: "Diagnosis and treatment of skin diseases, allergies and dermatological aesthetics.",
            fullDescription: "La dermatologie prend en charge les maladies de la peau, les allergies cutanées, les infections, les irritations et certains soins esthétiques dermatologiques.",
            fullDescriptionEn: "Dermatology treats skin diseases, skin allergies, infections, irritations, and certain dermatological aesthetic concerns.",
            schedule: ["Mardi - Vendredi : 09h00 - 15h00", "Samedi : sur rendez-vous"],
            benefits: ["Traitement des allergies", "Soins de la peau", "Diagnostic dermatologique", "Conseils personnalisés"],
            color: "#F39C12",
            bgClass: "bg-amber-50"
        },
        {
            name: "Ophtalmologie",
            nameEn: "Ophthalmology",
            icon: "fas fa-eye",
            imageKey: "bloc",
            desc: "Examens de la vue, correction optique, traitement du glaucome et de la cataracte.",
            descEn: "Eye exams, optical correction, glaucoma and cataract treatment.",
            fullDescription: "L’ophtalmologie permet de réaliser les examens de la vue, le diagnostic des troubles visuels et le suivi de certaines pathologies oculaires.",
            fullDescriptionEn: "Ophthalmology provides eye examinations, diagnosis of vision disorders, and follow-up for certain eye diseases.",
            schedule: ["Lundi - Vendredi : 09h00 - 16h00"],
            benefits: ["Examen de la vue", "Correction optique", "Suivi glaucome", "Conseils de prévention"],
            color: "#9B59B6",
            bgClass: "bg-purple-50"
        }
    ],
    doctors: [
        { id: 1, name: "NGO NDJEL BERNADETTE GAELLE", experience: 6, patients: 3200, rating: 4.8, photoKey: "doctor1", availability: ["Lun", "Mar", "Mer", "Jeu", "Ven"], email: "gaellendjel@yahoo.com", phone: "673175015", locales: { fr: { specialty: "Médecine Générale", specialties: ["Consultation Générale"], bio: "Le Dr. NGO NDJEL BERNADETTE GAELLE est un médecin généraliste expérimenté..." }, en: { specialty: "General Medicine", specialties: ["General Consultation"], bio: "Dr. NGO NDJEL BERNADETTE GAELLE is an experienced general practitioner..." } } },
        { id: 2, name: "BOUGUEN MBON LOLITA RUTH", experience: 8, patients: 1800, rating: 4.9, photoKey: "doctor2", availability: ["Lun", "Mar", "Jeu", "Sam"], email: "bouguenruth@gmail.com", phone: "656059205", locales: { fr: { specialty: "Médecine Générale", specialties: ["Cardiologie", "Consultation Générale"], bio: "Le Dr. BOUGUEN MBON LOLITA RUTH est cardiologue..." }, en: { specialty: "Cardiology", specialties: ["Cardiology", "General Consultation"], bio: "Dr. BOUGUEN MBON LOLITA RUTH is a cardiologist..." } } },
        { id: 3, name: "KEMGIA MIKEAL LAURE", experience: 10, patients: 2500, rating: 4.7, photoKey: "doctor3", availability: ["Mar", "Mer", "Ven", "Sam"], email: "Mikaellaurekemgia@gmail.com", phone: "673044267", locales: { fr: { specialty: "Médecine Générale", specialties: ["Pédiatrie"], bio: "Le Dr. KEMGIA MIKEAL LAURE est une pédiatre passionnée..." }, en: { specialty: "Pediatrics", specialties: ["Pediatrics"], bio: "Dr. KEMGIA MIKEAL LAURE is a passionate pediatrician..." } } }
    ],
    imageryServices: [
        { id: 1, name: "Radiologie Générale", nameEn: "General Radiology", icon: "fas fa-x-ray", imageKey: "consultation", roomName: "Salle de consultation", roomNameEn: "Consultation room", roomDescription: "Espace calme pour l'accueil du patient, l'examen clinique, les premiers bilans et les conseils du médecin dans un cadre rassurant.", roomDescriptionEn: "A quiet space for patient reception, clinical examination, initial assessment and medical guidance in a reassuring setting.", imageAlt: "Espace de consultation médicale", imageAltEn: "Medical consultation area", description: "Radiographies osseuses, pulmonaires et abdominales", descriptionEn: "Bone, chest and abdominal X-rays", equipment: "Système radiographique numérique haute résolution", equipmentEn: "High-resolution digital radiography system", benefits: ["Diagnostic rapide", "Faible radiation", "Résultats immédiats", "Technologie moderne"], benefitsEn: ["Fast diagnosis", "Low radiation", "Immediate results", "Modern technology"] },
        { id: 2, name: "Échographie", nameEn: "Ultrasound", icon: "fas fa-heart", imageKey: "soin", roomName: "Salle de soins", roomNameEn: "Treatment room", roomDescription: "Salle dédiée aux soins courants, aux pansements, aux injections, au suivi infirmier et aux interventions rapides du quotidien.", roomDescriptionEn: "A room dedicated to routine care, dressings, injections, nursing follow-up and everyday quick interventions.", imageAlt: "Soins médicaux assistés", imageAltEn: "Assisted medical care", description: "Échographie cardiaque, abdominale, pelvienne et mammaire", descriptionEn: "Cardiac, abdominal, pelvic and breast ultrasound", equipment: "Échographe Doppler couleur haute performance", equipmentEn: "High-performance color Doppler ultrasound unit", benefits: ["Pas de radiation", "Temps réel", "Non invasive", "Très précise"], benefitsEn: ["No radiation", "Real-time", "Non-invasive", "Highly accurate"] },
        { id: 4, name: "IRM", nameEn: "MRI", icon: "fas fa-brain", imageKey: "bloc", roomName: "Bloc opératoire", roomNameEn: "Operating room", roomDescription: "Salle stérile et équipée pour réaliser les interventions dans de bonnes conditions de sécurité, de confort et de surveillance.", roomDescriptionEn: "A sterile, equipped room for performing procedures in safe, comfortable and monitored conditions.", imageAlt: "Bloc opératoire équipé", imageAltEn: "Equipped operating room", description: "Imagerie par résonance magnétique - Cerveau, colonne, articulations", descriptionEn: "Magnetic resonance imaging for brain, spine and joints", equipment: "IRM 1.5 Tesla avec technologie avancée", equipmentEn: "1.5 Tesla MRI with advanced technology", benefits: ["Sans radiation", "Très détaillée", "Contraste excellent", "Contraste injecté optionnel"], benefitsEn: ["No radiation", "Highly detailed", "Excellent contrast", "Optional contrast injection"] },
        { id: 5, name: "Mammographie", nameEn: "Mammography", icon: "fas fa-ribbon", imageKey: "accouchement", roomName: "Salle d'accouchement", roomNameEn: "Delivery room", roomDescription: "Salle aménagée pour accompagner la maman et le bébé pendant l'accouchement, avec un environnement rassurant et organisé.", roomDescriptionEn: "A room arranged to support the mother and baby during delivery, in a reassuring and organized environment.", imageAlt: "Service maternité et accouchement", imageAltEn: "Maternity and childbirth department", description: "Dépistage et diagnostic du cancer du sein", descriptionEn: "Breast cancer screening and diagnosis", equipment: "Mammographe numérique 3D (Tomosynthèse)", equipmentEn: "3D digital mammography system (tomosynthesis)", benefits: ["Détection précoce", "Faible dose", "Précision accrue", "Pour tous les âges"], benefitsEn: ["Early detection", "Low dose", "Greater precision", "For all ages"] },
        { id: 6, name: "Radiologie Dentaire", nameEn: "Dental Radiology", icon: "fas fa-tooth", imageKey: "pharmacie", roomName: "Pharmacie", roomNameEn: "Pharmacy", roomDescription: "Espace de stockage et de délivrance des médicaments prescrits aux patients, avec un accès rapide aux traitements nécessaires.", roomDescriptionEn: "A space for storing and dispensing medications prescribed to patients, with quick access to required treatments.", imageAlt: "Pharmacie de la clinique", imageAltEn: "Clinic pharmacy", description: "Radiographies dentaires panoramiques et intra-orales", descriptionEn: "Panoramic and intraoral dental X-rays", equipment: "Radiographe dentaire numérique panoramique", equipmentEn: "Digital panoramic dental X-ray system", benefits: ["Haute résolution", "Très peu de radiation", "Images immédiatement", "Vision 3D optionnelle"], benefitsEn: ["High resolution", "Very low radiation", "Immediate images", "Optional 3D view"] },
        { id: 7, name: "Ostéodensitométrie", nameEn: "Bone Densitometry", icon: "fas fa-bone", imageKey: "hospitalisation", roomName: "Chambre d'hospitalisation", roomNameEn: "Hospital room", roomDescription: "Chambre confortable pour le repos, la surveillance médicale, l'accompagnement du patient et une récupération plus sereine.", roomDescriptionEn: "A comfortable room for rest, medical monitoring, patient support and a more peaceful recovery.", imageAlt: "Chambre d'hospitalisation", imageAltEn: "Hospitalization room", description: "Mesure de la densité osseuse (dépistage ostéoporose)", descriptionEn: "Bone density measurement for osteoporosis screening", equipment: "Densitomètre osseux DEXA", equipmentEn: "DEXA bone densitometer", benefits: ["Dépistage précoce", "Très faible radiation", "Résultat immédiat", "Suivi facile"], benefitsEn: ["Early screening", "Very low radiation", "Immediate results", "Easy follow-up"] },
        { id: 8, name: "Fluoroscopie", nameEn: "Fluoroscopy", icon: "fas fa-circle-radiation", imageKey: "attente", roomName: "Salle d'attente", roomNameEn: "Waiting room", roomDescription: "Espace d'accueil où les patients et accompagnants patientent avant la consultation, dans un cadre propre et organisé.", roomDescriptionEn: "A reception space where patients and companions wait before consultation in a clean and organized setting.", imageAlt: "Salle d'attente de la clinique", imageAltEn: "Clinic waiting room", description: "Imagerie en temps réel pour interventions guidées", descriptionEn: "Real-time imaging for guided procedures", equipment: "Système de fluoroscopie numérique avancé", equipmentEn: "Advanced digital fluoroscopy system", benefits: ["Guidage précis", "Temps réel", "Pour les gestes", "Technologie moderne"], benefitsEn: ["Precise guidance", "Real-time", "Procedure support", "Modern technology"] },
    ],
    testimonials: [
        { id: 1, name: "Dongmo arol", nameEn: "Dongmo arol", info: "Patiente suivie pour un problème de diabète", infoEn: "Patient followed for diabetes", text: "Un centre médical exceptionnel ! L'équipe est à l'écoute, les délais d'attente sont raisonnables et les médecins sont très compétents. Je recommande vivement.", textEn: "An exceptional medical center! The team listens carefully, waiting times are reasonable and the doctors are very competent. I highly recommend it.", photoSeed: "testimonial-marie" },
        { id: 2, name: "carolle maffo", nameEn: "carolle maffo", info: "Patient suivi pour un problème cardiaque", infoEn: "Patient followed for a heart condition", text: "Le Dr. NGO NDJEL BERNADETTE GAELLE m'a suivi pour un problème cardiaque avec beaucoup de professionnalisme. Grâce à lui, ma santé s'est nettement améliorée. Merci à la Clinique Angelo !", textEn: "The doctor followed me for a heart problem with great professionalism. Thanks to him, my health improved significantly. Thank you to Angelo Clinic!", photoSeed: "testimonial-jean" },
        { id: 3, name: "Charlotte Dontsa", nameEn: "Charlotte Dontsa", info: "Mère de famille", infoEn: "Mother", text: "Ma fille est suivie par le Dr. KEMGIA MIKEAL LAURE depuis sa naissance. Toujours disponible et bienveillante, elle nous rassure à chaque visite. Un vrai bonheur d'être patiente ici.", textEn: "My daughter has been followed by the doctor since birth. Always available and caring, she reassures us at every visit. A real pleasure to be a patient here.", photoSeed: "testimonial-chantal" }
    ]
}

export const getHomeContent = async (_req: Request, res: Response) => {
    res.json(HOME_CONTENT)
}
const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
}

function parseTags(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map((tag) => String(tag).trim()).filter(Boolean)
    }

    if (typeof value !== "string") {
        return []
    }

    const trimmed = value.trim()

    if (!trimmed) {
        return []
    }

    try {
        const parsed = JSON.parse(trimmed)

        if (Array.isArray(parsed)) {
            return parsed.map((tag) => String(tag).trim()).filter(Boolean)
        }
    } catch {
        // Keep the comma-separated fallback below.
    }

    return trimmed
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
}


export const getContentStats = async (_req: Request, res: Response): Promise<void> => {
    try {
        const totalArticles = await Article.countDocuments()
        const publishedArticles = await Article.countDocuments({ status: "published" })
        const draftArticles = await Article.countDocuments({ status: "draft" })
        const scheduledArticles = await Article.countDocuments({ status: "scheduled" })

        const articles = await Article.find()

        const totalViews = articles.reduce((sum, article) => sum + article.views, 0)

        const totalShares = articles.reduce((sum, article) => {
            return (
                sum +
                article.shares.whatsapp +
                article.shares.facebook +
                article.shares.linkedin +
                article.shares.twitter +
                article.shares.copyLink
            )
        }, 0)

        res.status(200).json({
            totalArticles,
            publishedArticles,
            draftArticles,
            scheduledArticles,
            totalViews,
            totalShares
        })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const getArticles = async (_req: Request, res: Response): Promise<void> => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 })
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const getPublishedArticles = async (_req: Request, res: Response): Promise<void> => {
    try {
        const articles = await Article.find({ status: "published" }).sort({
            publishedAt: -1,
            createdAt: -1
        })

        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const getPublishedArticleBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findOne({
            slug: req.params.slug,
            status: "published"
        })

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        res.status(200).json(article)
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error })
    }
}

export const incrementArticleView = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findOneAndUpdate(
            {
                _id: req.params.id,
                status: "published"
            },
            {
                $inc: { views: 1 }
            },
            { new: true }
        )

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        res.status(200).json(article)
    } catch (error) {
        res.status(500).json({ message: "Erreur compteur vue", error })
    }
}

export const trackArticleShare = async (req: Request, res: Response): Promise<void> => {
    try {
        const { platform } = req.body

        if (!isSharePlatform(platform)) {
            res.status(400).json({ message: "Plateforme de partage invalide" })
            return
        }

        const article = await Article.findOneAndUpdate(
            {
                _id: req.params.id,
                status: "published"
            },
            {
                $inc: { [`shares.${platform}`]: 1 }
            },
            { new: true }
        )

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        res.status(200).json(article)
    } catch (error) {
        res.status(500).json({ message: "Erreur compteur partage", error })
    }
}

export const createArticle = async (req: Request, res: Response): Promise<void> => {
    try {
        const title = String(req.body.title || req.body.titleEn || "").trim()
        const content = String(req.body.content || req.body.contentEn || "").trim()

        if (!title || !content) {
            res.status(400).json({
                message: "Le titre et le contenu sont obligatoires dans au moins une langue"
            })
            return
        }

        const slugSource = String(req.body.slug || req.body.slugEn || title).trim()
        const slug = generateSlug(slugSource)

        const existingArticle = await Article.findOne({ slug })

        if (existingArticle) {
            res.status(400).json({
                message: "Un article avec ce titre ou ce slug existe déjà"
            })
            return
        }

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.coverImage

        const tags = parseTags(req.body.tags)
        const tagsEn = parseTags(req.body.tagsEn)

        const article = await Article.create({
            ...req.body,
            title,
            content,
            tags,
            tagsEn,
            slug,
            coverImage: imageUrl,
            status: req.body.status || "draft",
            views: 0,
            shares: {
                whatsapp: 0,
                facebook: 0,
                linkedin: 0,
                twitter: 0,
                copyLink: 0
            }
        })

        res.status(201).json({
            message: "Article créé avec succès",
            article
        })
    } catch (error) {
        console.error("Erreur création article :", error)

        res.status(500).json({
            message: "Erreur création article",
            error: error instanceof Error ? error.message : error
        })
    }
}
export const updateArticle = async (req: Request, res: Response): Promise<void> => {
    try {
        const payload = { ...req.body }

        if (req.file) {
            payload.coverImage = `/uploads/${req.file.filename}`
        }

        if ("tags" in payload) {
            payload.tags = parseTags(payload.tags)
        }

        if ("tagsEn" in payload) {
            payload.tagsEn = parseTags(payload.tagsEn)
        }

        const titleForSlug = payload.title || payload.titleEn

        if (titleForSlug && !payload.slug) {
            payload.slug = generateSlug(String(titleForSlug))
        }

        if (payload.slug) {
            payload.slug = generateSlug(String(payload.slug))

            const existingArticle = await Article.findOne({
                slug: payload.slug,
                _id: { $ne: req.params.id }
            })

            if (existingArticle) {
                res.status(400).json({
                    message: "Un article avec ce titre ou ce slug existe déjà"
                })
                return
            }
        }

        if (payload.status === "published" && !payload.publishedAt) {
            payload.publishedAt = new Date()
        }

        if (payload.status && payload.status !== "published") {
            payload.publishedAt = null
        }

        const article = await Article.findByIdAndUpdate(req.params.id, payload, {
            new: true
        })

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        res.status(200).json({
            message: "Article modifié avec succès",
            article
        })
    } catch (error) {
        res.status(500).json({
            message: "Erreur modification article",
            error: error instanceof Error ? error.message : error
        })
    }
}

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id)

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        res.status(200).json({ message: "Article supprimé avec succès" })
    } catch (error) {
        res.status(500).json({ message: "Erreur suppression article", error })
    }
}

export const publishArticle = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            {
                status: "published",
                publishedAt: new Date()
            },
            { new: true }
        )

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        res.status(200).json({
            message: "Article publié avec succès",
            article
        })
    } catch (error) {
        res.status(500).json({ message: "Erreur publication article", error })
    }
}

export const unpublishArticle = async (req: Request, res: Response): Promise<void> => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            {
                status: "draft",
                publishedAt: null
            },
            { new: true }
        )

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        res.status(200).json({
            message: "Article dépublié avec succès",
            article
        })
    } catch (error) {
        res.status(500).json({ message: "Erreur dépublication article", error })
    }
}
export const getArticleFacebookShareUrl = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const article = await Article.findById(req.params.id)

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        if (article.status !== "published") {
            res.status(400).json({
                success: false,
                message: "L’article doit être publié avant d’être partagé sur Facebook."
            })
            return
        }

        const articleUrl = buildPublicArticleUrl(article.slug)
        const shareUrl = buildFacebookShareUrl(articleUrl)

        res.status(200).json({
            success: true,
            articleUrl,
            shareUrl
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur génération du lien Facebook",
            error: error instanceof Error ? error.message : error
        })
    }
}

export const publishArticleToFacebook = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const article = await Article.findById(req.params.id)

        if (!article) {
            res.status(404).json({ message: "Article introuvable" })
            return
        }

        if (article.status !== "published") {
            res.status(400).json({
                success: false,
                message: "L’article doit être publié sur le site avant d’être publié sur Facebook."
            })
            return
        }

        const result = await publishArticleLinkToFacebook({
            title: article.title,
            excerpt: article.excerpt,
            slug: article.slug
        })

        const statusCode = result.success ? 200 : 400

        res.status(statusCode).json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur publication Facebook",
            error: error instanceof Error ? error.message : error
        })
    }
}

export const translateArticle = async (_req: Request, res: Response): Promise<void> => {
    res.status(410).json({
        message: "La traduction automatique est désactivée. Remplissez les champs français et anglais manuellement."
    })
}