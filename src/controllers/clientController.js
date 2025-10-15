import { Client } from "../models/Client.js";

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
        const { nome, email, cartao, saldo_milhas, destino_desejado } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/
        const cartoesValidos = [ "Gold", "Platinum", "Black", "Infinite"]

        if(!nome || !email || !cartao) {
            return res.status(400).json({
                error: "Dados incompletos",
                message: "Os campos nome, email e cartao são obrigatórios"
            })
        }

        if(typeof nome !== "string" || nome.trim().length < 2) {
            return res.status(400).json({
                error: "Nome inválido",
                message: "O nome deve ter pelo menos 2 caracteres"
            })
        }

        if(typeof email !== "string" || !emailRegex.test(email)) {
            return res.status(400).json({
                error: "Email inválido",
                message: "Forneça um email válido"
            })
        }

        if(!cartoesValidos.includes(cartao)) {
            return res.status(400).json({
                error: "Cartão inválido",
                message: `O cartão deve ser de um dos seguintes tipos: ${cartoesValidos.join(', ')}`
            });
        }

        if(saldo_milhas !== undefined) {
            if(typeof saldo_milhas !== "number" || saldo_milhas < 0) {
                return res.status(400).json({
                    error: "Saldo de milhas inválido",
                    message: "O saldo de milhas deve ser um número positivo"
                });
            }
        }

        if (destino_desejado !== undefined && typeof destino_desejado !== "string") {
            return res.status(400).json({
                error: "Destino desejado inválido",
                message: "O destino desejado deve ser uma string"
            });
        }

        const clientData = {
            nome: nome.trim(),
            email: email.trim(),
            cartao: cartao,
            saldo_milhas: saldo_milhas || 0,
            destino_desejado: (destino_desejado || "").trim()
        }

        const client = Client.create(clientData);

        res.status(201).json({
            message: "Cliente criado com sucesso",
            cliente: client
        });
        
    } catch(error) {
        
        if (error.message.includes('email') || error.message.includes('existe')) {
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

export {
    getAllClients,
    getClientById,
    createClient
};