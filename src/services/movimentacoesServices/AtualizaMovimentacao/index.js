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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
const GravaLog_1 = __importDefault(require("../../GravaLog"));
const CadastraMovimentacao_1 = __importDefault(require("../CadastraMovimentacao"));
const ExcluiMovimentacao_1 = __importDefault(require("../ExcluiMovimentacao"));
function AtualizaMovimentacao(USUARIO_ID, MOVIMENTACAO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA) {
    return __awaiter(this, void 0, void 0, function* () {
        //movimentacao: Movimentacoes,
        const con = yield (0, database_1.default)();
        const MovimentacaoID = MOVIMENTACAO_ID;
        try {
            /** Encontro a movimentação desejada */
            const sql_movimentacao = `SELECT * FROM MOVIMENTACOES WHERE ID = ?`;
            const MovimentacaoResultadoPesquisa = yield (con === null || con === void 0 ? void 0 : con.execute(sql_movimentacao, [MovimentacaoID]));
            const movObj = MovimentacaoResultadoPesquisa[0][0];
            const investimentoId = movObj.INVESTIMENTOS_ID;
            console.log(movObj, investimentoId);
            /* Excluir a movimentação e atualizar o investimento */
            yield (0, ExcluiMovimentacao_1.default)(USUARIO_ID, MovimentacaoID);
            /** Crio uma nova movimentação */
            let movimentacao = new movimentacaoModel_1.default(0, investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, QUANTIDADE_MOVIMENTACAO * PRECO, DATA_COMPRA, isCOMPRA, isVENDA, new Date());
            yield (0, CadastraMovimentacao_1.default)(movimentacao, true);
            return { isSucesso: true, message: 'Movimentação atualizada com sucesso!' };
        }
        catch (error) {
            console.log('[AtualizaMovimentacao] - ', error);
            yield (0, GravaLog_1.default)(`[AtualizaMovimentacao] - ${error}`);
            return { isSucesso: false, message: 'Ops... não foi possivel atualizar movimentação.' };
        }
    });
}
exports.default = AtualizaMovimentacao;
