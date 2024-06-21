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
const investimentosModel_1 = __importDefault(require("../../../models/investimentosModel"));
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
const GravaLog_1 = __importDefault(require("../../GravaLog"));
function ExcluirMovimentacao(USUARIO_ID, MOVIMENTACAO_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        const sql_SearchMovimentacoes = 'SELECT * FROM MOVIMENTACOES WHERE ID = ?';
        const sql_SearchInvestimento = 'SELECT * FROM INVESTIMENTOS WHERE ID = ?';
        let total;
        let precoMedio;
        try {
            /** ENCONTRA MOVIMENTACAO */
            const result = yield (con === null || con === void 0 ? void 0 : con.execute(sql_SearchMovimentacoes, [MOVIMENTACAO_ID]));
            const movimentacao = result[0][0];
            /** ENCONTRA INVESTIMENTO */
            const resultInvestimento = yield (con === null || con === void 0 ? void 0 : con.execute(sql_SearchInvestimento, [movimentacao.INVESTIMENTOS_ID]));
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
            const sql_atualizaInvestimentos = yield investimentosModel_1.default.AtualizaInvestimentos(movimentacao.INVESTIMENTOS_ID, quantidade, precoMedio, total);
            yield (con === null || con === void 0 ? void 0 : con.execute(sql_atualizaInvestimentos));
            /** DELETA MOVIMENTAÇÃO */
            const sql_DeletaMovimentacao = yield movimentacaoModel_1.default.ExcluiMovimentacao(MOVIMENTACAO_ID);
            yield (con === null || con === void 0 ? void 0 : con.execute(sql_DeletaMovimentacao));
            return { isSucesso: true, message: 'Movimentação deletada com sucesso!' };
        }
        catch (error) {
            console.log(error);
            yield (0, GravaLog_1.default)(`ExcluirMovimentacao - ${error}`);
            return { isSucesso: false, message: 'Ops... Houve um erro ao realizar operação de Excluir movimentaçao.' };
        }
        finally {
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
exports.default = ExcluirMovimentacao;
