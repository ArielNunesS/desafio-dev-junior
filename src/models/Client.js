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
}