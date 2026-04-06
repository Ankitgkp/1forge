// cors and security headers middleware config.

import cors from "cors";
import { Request, Response, NextFunction } from "express";

const allowedOrigins = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'https://1forge.in',
    'https://www.1forge.in',
]);

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
            return;
        }

        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
});

export const securityHeaders = (_req: Request, res: Response, next: NextFunction) => {
    res.header('Cross-Origin-Embedder-Policy', 'credentialless');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    next();
};
