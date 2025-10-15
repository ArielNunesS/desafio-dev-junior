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

const getClientById = (req, res) => {
    try {
        const client = Client.getById(req.params.id);

        if(!client) {
            return res.status(404).json({
                error: "Cliente não encontrado",
                message: "Não foi encontrado nenhum cliente com o ID inserido"
            })
        }

        res.json(client);
    } catch(error) {
        res.status(500).json({
            error: "Erro ao buscar cliente",
            message: error.message
        })
    }
}

export {
    getAllClients,
    getClientById
};