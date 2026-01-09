// health check route

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ status: "Server is running", message: "Bolt Backend API" });
});

export default router;
