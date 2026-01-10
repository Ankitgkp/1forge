// main entry point for backend server

import express from "express";
import { config } from "./config/index.js";
import { corsMiddleware, securityHeaders } from "./middleware/cors.js";
import routes from "./routes/index.js";

const app = express();

// Enable CORS first
app.use(corsMiddleware);

// Handle preflight requests
app.options('*', corsMiddleware);

app.use(express.json()); 
app.use(securityHeaders);
app.use(routes);

// Start server only if not in Vercel
if (process.env.VERCEL !== '1') {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

// Export for Vercel serverless
export default app;
