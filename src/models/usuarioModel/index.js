"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static CadastraUsuario(NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `INSERT INTO USUARIO (NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, DATA_INCLUSAO) 
        VALUES (${NOME},${CPF},'${DATA_NASCIMENTO}',${TELEFONE},${EMAIL},${SENHA}, now())`;
            return sql;
        });
    }
    static PesquisaUsuario(ID, CPF) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM USUARIO 
                    WHERE 
                        ((USUARIO.ID = ${ID}) OR (${ID} IS NULL) OR (${ID} = '') OR (${ID} = 0)) AND 
                        ((USUARIO.CPF = '${CPF}') OR ('${CPF}' IS NULL) OR ('${CPF}' = ''))`;
            return sql;
        });
    }
}
exports.default = Usuario;
