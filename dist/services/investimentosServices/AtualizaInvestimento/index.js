"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const investimentosModel_1 = __importDefault(require("../../../models/investimentosModel"));
async function AtualizaInvestimento(investimento) {
    const con = await (0, database_1.default)();
    try {
        const sql_UpdateInvestimento = await investimentosModel_1.default.AtualizaInvestimentos(investimento.ID, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
        const res = await con?.execute(sql_UpdateInvestimento);
        return true;
    }
    catch (error) {
        console.log('[ERROR] - AtualizaInvestimento: ', error);
        return false;
    }
}
exports.default = AtualizaInvestimento;
