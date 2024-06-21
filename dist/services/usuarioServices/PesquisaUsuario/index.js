"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const usuarioModel_1 = __importDefault(require("../../../models/usuarioModel"));
async function PesquisaUsuario(ID, CPF) {
    const con = await (0, database_1.default)();
    try {
        const sql = await usuarioModel_1.default.PesquisaUsuario(0, CPF);
        const result = await con?.execute(sql);
        const usuario = result[0][0];
        return usuario;
    }
    catch (error) {
        console.log('[DRROR] - PesquisaUsuario: ', error);
        return { isSucesso: false, message: 'Ops.. Não foi possivel encontrar usuario com os dados fornecidos.' };
    }
    finally {
        con?.end();
    }
}
exports.default = PesquisaUsuario;
