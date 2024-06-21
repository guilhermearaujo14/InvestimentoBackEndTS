"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
async function PesquisaMovimentacoes(USUARIO_ID, dataInicio, dataFinal, PAPEL, TIPO_ATIVO_ID, MOVIMENTACAO_ID) {
    const con = await (0, database_1.default)();
    try {
        const sql = await movimentacaoModel_1.default.PesquisaMovimentacao(USUARIO_ID, dataInicio, dataFinal, PAPEL, TIPO_ATIVO_ID, MOVIMENTACAO_ID);
        const response = await con?.execute(sql);
        // console.log(response[0])
        return response[0];
    }
    catch (error) {
        console.log('[ERROR] - PesquisaMovimentacao: ', error);
        return { isSucesso: false, message: 'Ops.. Não foi possivel trazer os dados desejados.' };
    }
}
exports.default = PesquisaMovimentacoes;
