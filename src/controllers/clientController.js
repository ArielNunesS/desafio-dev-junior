import { Client } from "../models/Client.js";

const getAllClients = (req, res) => {
    try {
        const clients = Client.getAll()
        res.json({
            total: clients.length,
            clientes: clients,
        })
    } catch(error) {
        res.status(500).json({
            error: "Erro ao listar clientes",
            message: error.message,
        });
    }
};

export {
    getAllClients,
};