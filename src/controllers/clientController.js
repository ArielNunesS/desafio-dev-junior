import { Client } from "../models/Client.js";
import { validateData } from "./validations/validateData.js";

const getAllClients = (req, res) => {
    try {
        const clients = Client.getAll()
        res.json({
            total: clients.length,
            clientes: clients
        });
    } catch(error) {
        res.status(500).json({
            error: "Erro ao listar clientes",
            message: error.message
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
            });
        }

        res.json(client);
    } catch(error) {
        res.status(500).json({
            error: "Erro ao buscar cliente",
            message: error.message
        });
    }
};

const createClient = (req, res) => {
    try {
        const data = req.body;
        const errors = validateData(data);

        if(errors) {
            return res.status(400).json(errors);
        }

        const clientData = {
            nome: data.nome.trim(),
            email: data.email.trim(),
            cartao: data.cartao,
            saldo_milhas: data.saldo_milhas || 0,
            destino_desejado: (data.destino_desejado || "").trim()
        }

        const client = Client.create(clientData);

        res.status(201).json({
            message: "Cliente criado com sucesso",
            cliente: client
        });
        
    } catch(error) {
        if (error.message.includes("email") || error.message.includes("existe")) {
            return res.status(409).json({
                error: "Email já cadastrado",
                message: "Já existe um cliente com este email"
            });
        }

        res.status(400).json({
            error: "Erro ao criar cliente",
            message: error.message
        });
    }
};

const updateClient = (req, res) => {
    try {

    } catch(error) {
        
    }
}

export {
    getAllClients,
    getClientById,
    createClient
};
