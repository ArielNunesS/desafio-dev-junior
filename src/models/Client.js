const tiposCartao = [ "Gold", "Platinum", "Black", "Infinite"];
const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const clients = [];
let nextId = 2;

clients.push({
    id: 1,
    nome: "teste",
    email: "teste@gmail.com",
    cartao: "Gold",
    saldo_milhas: 1500,
    destino_desejado: "Paris",
})

export class Client {
    constructor(id, nome, email, cartao, saldo_milhas, destino_desejado) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cartao = cartao;
        this.saldo_milhas = saldo_milhas;
        this.destino_desejado = destino_desejado;
    }

    static getAll() {
        return clients.map(client => client);
    }

    static getById(id) {
        return clients.find(c => c.id === parseInt(id));
    }

    static create(data) {

         const emailExists = clients.some(client => 
            client.email.toLowerCase() === data.email.toLowerCase()
        );

        if(emailExists) {
            throw new Error("Já existe um cliente com este email");
        }

        const newClient = new Client(
            nextId++,
            data.nome.trim(),
            data.email.trim().toLowerCase(),
            data.cartao,
            data.saldo_milhas || 0,
            data.destino_desejado || ""
        );

        clients.push(newClient);
        return clients;
    }

     static update(id, updateData) {
        const index = clients.findIndex(client => client.id === parseInt(id));
        
        if (index === -1) {
            throw new Error("Cliente não encontrado");
        }

        const client = clients[index];

        if (updateData.nome !== undefined) client.nome = updateData.nome;
        if (updateData.email !== undefined) client.email = updateData.email;
        if (updateData.cartao !== undefined) client.cartao = updateData.cartao;
        if (updateData.saldo_milhas !== undefined) client.saldo_milhas = updateData.saldo_milhas;
        if (updateData.destino_desejado !== undefined) client.destino_desejado = updateData.destino_desejado;

        return client;
    }

    static delete(id) {
        const index = clients.findIndex(client => client.id === id);
        
        if (index === -1) {
            throw new Error("Cliente não encontrado");
        }

        const clientRemoved = clients.splice(index, 1)[0];
        return clientRemoved;
    }
}