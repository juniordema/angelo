import { Request, Response, NextFunction } from "express"

export const notFound = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const error = new Error(`Route introuvable : ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack
    })
}