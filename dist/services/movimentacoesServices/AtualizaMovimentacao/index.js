"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
const GravaLog_1 = __importDefault(require("../../GravaLog"));
const CadastraMovimentacao_1 = __importDefault(require("../CadastraMovimentacao"));
const ExcluiMovimentacao_1 = __importDefault(require("../ExcluiMovimentacao"));
async function AtualizaMovimentacao(USUARIO_ID, MOVIMENTACAO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA) {
    //movimentacao: Movimentacoes,
    const con = await (0, database_1.default)();
    const MovimentacaoID = MOVIMENTACAO_ID;
    try {
        /** Encontro a movimentação desejada */
        const sql_movimentacao = `SELECT * FROM MOVIMENTACOES WHERE ID = ?`;
        const MovimentacaoResultadoPesquisa = await con?.execute(sql_movimentacao, [MovimentacaoID]);
        const movObj = MovimentacaoResultadoPesquisa[0][0];
        const investimentoId = movObj.INVESTIMENTOS_ID;
        console.log(movObj, investimentoId);
        /* Excluir a movimentação e atualizar o investimento */
        await (0, ExcluiMovimentacao_1.default)(USUARIO_ID, MovimentacaoID);
        /** Crio uma nova movimentação */
        let movimentacao = new movimentacaoModel_1.default(0, investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, QUANTIDADE_MOVIMENTACAO * PRECO, DATA_COMPRA, isCOMPRA, isVENDA, new Date());
        await (0, CadastraMovimentacao_1.default)(movimentacao, true);
        return { isSucesso: true, message: 'Movimentação atualizada com sucesso!' };
    }
    catch (error) {
        console.log('[AtualizaMovimentacao] - ', error);
        await (0, GravaLog_1.default)(`[AtualizaMovimentacao] - ${error}`);
        return { isSucesso: false, message: 'Ops... não foi possivel atualizar movimentação.' };
    }
}
exports.default = AtualizaMovimentacao;
