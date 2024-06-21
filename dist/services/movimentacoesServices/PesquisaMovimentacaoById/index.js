"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
async function PesquisaMovimentacaoById(ID) {
    const con = await (0, database_1.default)();
    try {
        const sql = await movimentacaoModel_1.default.PesquisaMovimentacaoPorId(ID);
        const response = await con?.execute(sql);
        return response[0];
    }
    catch (error) {
    }
    finally {
        await con?.end();
    }
}
exports.default = PesquisaMovimentacaoById;
