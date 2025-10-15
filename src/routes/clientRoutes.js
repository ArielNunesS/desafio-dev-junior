import express from "express";
import { Router } from "express";
import * as clientController from "../controllers/clientController.js";

const router = Router()

router.get("/", clientController.getAllClients);
router.post("/", clientController.createClient);
router.get("/:id", clientController.getClientById);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);
export default router;