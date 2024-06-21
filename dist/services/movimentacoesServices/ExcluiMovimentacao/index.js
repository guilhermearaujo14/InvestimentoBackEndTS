"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const investimentosModel_1 = __importDefault(require("../../../models/investimentosModel"));
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
const GravaLog_1 = __importDefault(require("../../GravaLog"));
async function ExcluirMovimentacao(USUARIO_ID, MOVIMENTACAO_ID) {
    const con = await (0, database_1.default)();
    const sql_SearchMovimentacoes = 'SELECT * FROM MOVIMENTACOES WHERE ID = ?';
    const sql_SearchInvestimento = 'SELECT * FROM INVESTIMENTOS WHERE ID = ?';
    let total;
    let precoMedio;
    try {
        /** ENCONTRA MOVIMENTACAO */
        const result = await con?.execute(sql_SearchMovimentacoes, [MOVIMENTACAO_ID]);
        const movimentacao = result[0][0];
        /** ENCONTRA INVESTIMENTO */
        const resultInvestimento = await con?.execute(sql_SearchInvestimento, [movimentacao.INVESTIMENTOS_ID]);
        const investimento = resultInvestimento[0][0];
        /** ATUALIZA INVESTIMENTO */
        const quantidade = investimento.QUANTIDADE - movimentacao.QUANTIDADE;
        if (quantidade === 0) {
            total = 0;
            precoMedio = 0;
        }
        else {
            total = investimento.TOTAL_INVESTIDO - movimentacao.TOTAL;
            precoMedio = total / quantidade;
        }
        const sql_atualizaInvestimentos = await investimentosModel_1.default.AtualizaInvestimentos(movimentacao.INVESTIMENTOS_ID, quantidade, precoMedio, total);
        await con?.execute(sql_atualizaInvestimentos);
        /** DELETA MOVIMENTAÇÃO */
        const sql_DeletaMovimentacao = await movimentacaoModel_1.default.ExcluiMovimentacao(MOVIMENTACAO_ID);
        await con?.execute(sql_DeletaMovimentacao);
        return { isSucesso: true, message: 'Movimentação deletada com sucesso!' };
    }
    catch (error) {
        console.log(error);
        await (0, GravaLog_1.default)(`ExcluirMovimentacao - ${error}`);
        return { isSucesso: false, message: 'Ops... Houve um erro ao realizar operação de Excluir movimentaçao.' };
    }
    finally {
        await con?.end();
    }
}
exports.default = ExcluirMovimentacao;
