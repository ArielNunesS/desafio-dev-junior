export const validateData = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/
    const cartoesValidos = [ "Gold", "Platinum", "Black", "Infinite" ];

    if(!data.nome || !data.email || !data.cartao) {
            return {
                error: "Dados incompletos",
                message: "Os campos nome, email e cartao são obrigatórios"
            };
        }

        if(typeof data.nome !== "string" || data.nome.trim().length < 2) {
            return {
                error: "Nome inválido",
                message: "O nome deve ter pelo menos 2 caracteres"
            };
        }

        if(typeof data.email !== "string" || !emailRegex.test(data.email)) {
            return {
                error: "Email inválido",
                message: "Forneça um email válido"
            };
        }

        if(!cartoesValidos.includes(data.cartao)) {
            return {
                error: "Cartão inválido",
                message: `O cartão deve ser de um dos seguintes tipos: ${cartoesValidos.join(', ')}`
            };
        }

        if(data.saldo_milhas !== undefined) {
            if(typeof data.saldo_milhas !== "number" || data.saldo_milhas < 0) {
                return {
                    error: "Saldo de milhas inválido",
                    message: "O saldo de milhas deve ser um número positivo"
                };
            }
        }

        if (data.destino_desejado !== undefined && typeof data.destino_desejado !== "string") {
            return {
                error: "Destino desejado inválido",
                message: "O destino desejado deve ser uma string"
            };
        }
        
    return null;
}