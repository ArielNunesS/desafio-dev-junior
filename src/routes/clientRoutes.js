import express from "express";
import { Router } from "express";
import * as clientController from "../controllers/clientController.js";

const router = Router()

router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);
router.post("/", clientController.createClient);
export default router;