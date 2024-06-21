"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(ID, NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, DATA_INCLUSAO) {
        this.ID = ID,
            this.NOME = NOME,
            this.CPF = CPF,
            this.DATA_NASCIMENTO = DATA_NASCIMENTO,
            this.TELEFONE = TELEFONE,
            this.EMAIL = EMAIL,
            this.SENHA = SENHA,
            this.DATA_INCLUSAO = DATA_INCLUSAO;
    }
    static async CadastraUsuario(NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA) {
        let sql = `INSERT INTO USUARIO (NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, DATA_INCLUSAO) 
        VALUES ('${NOME}','${CPF}','${DATA_NASCIMENTO}','${TELEFONE}','${EMAIL}','${SENHA}', now())`;
        return sql;
    }
    static async PesquisaUsuario(ID, CPF) {
        let sql = `SELECT * FROM USUARIO 
                    WHERE 
                        ((USUARIO.ID = ${ID}) OR (${ID} IS NULL) OR (${ID} = '') OR (${ID} = 0)) AND 
                        ((USUARIO.CPF = '${CPF}') OR ('${CPF}' IS NULL) OR ('${CPF}' = ''))`;
        return sql;
    }
}
exports.default = Usuario;
