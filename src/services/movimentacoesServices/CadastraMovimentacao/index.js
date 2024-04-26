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
const AtualizaInvestimento_1 = __importDefault(require("../../investimentosServices/AtualizaInvestimento"));
function CadastraMovimentacao(movimentacoes, isUpdateInvestimento) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        let result = [];
        let isPodeCadastrarMovimentacao = true;
        let isPodeAtualizar = false;
        try {
            const sql_CriaMovimentacao = yield movimentacaoModel_1.default.Criamovimentacao(movimentacoes.INVESTIMENTOS_ID, movimentacoes.QUANTIDADE, movimentacoes.PRECO, movimentacoes.TOTAL, movimentacoes.DATA_MOVIMENTACAO, movimentacoes.isCOMPRA, movimentacoes.isVENDA);
            const sql_investimento = yield investimentosModel_1.default.GetInvestimentos(movimentacoes.INVESTIMENTOS_ID, 0, 0, '');
            let resultadoPesquisa = yield (con === null || con === void 0 ? void 0 : con.execute(sql_investimento));
            let j = resultadoPesquisa === null || resultadoPesquisa === void 0 ? void 0 : resultadoPesquisa[0];
            let investimentoParaAtualizar = [j][0][0];
            if (movimentacoes.isCOMPRA) {
                // Aqui irei somar os valores
                investimentoParaAtualizar.QUANTIDADE += movimentacoes.QUANTIDADE;
                investimentoParaAtualizar.TOTAL_INVESTIDO += movimentacoes.TOTAL;
                investimentoParaAtualizar.PRECO_MEDIO = investimentoParaAtualizar.TOTAL_INVESTIDO / investimentoParaAtualizar.QUANTIDADE;
                isPodeAtualizar = true;
            }
            else {
                if (investimentoParaAtualizar.QUANTIDADE >= movimentacoes.QUANTIDADE) {
                    isPodeAtualizar = true;
                }
                else {
                    isPodeAtualizar = false;
                    isPodeCadastrarMovimentacao = false;
                    result = { isSucesso: false, message: 'Ops... Quantidade informada é maior do que disponivel para venda!' };
                }
                investimentoParaAtualizar.QUANTIDADE -= movimentacoes.QUANTIDADE;
                investimentoParaAtualizar.TOTAL_INVESTIDO -= movimentacoes.TOTAL;
                investimentoParaAtualizar.PRECO_MEDIO = investimentoParaAtualizar.TOTAL_INVESTIDO / investimentoParaAtualizar.QUANTIDADE;
            }
            if (isUpdateInvestimento == true && isPodeAtualizar == true) {
                const investimento = new investimentosModel_1.default(investimentoParaAtualizar.ID, investimentoParaAtualizar.USUARIO_ID, investimentoParaAtualizar.TIPO_ATIVO_ID, investimentoParaAtualizar.PAPEL, investimentoParaAtualizar.NOME_EMPRESA, investimentoParaAtualizar.SETOR, investimentoParaAtualizar.QUANTIDADE, investimentoParaAtualizar.PRECO_MEDIO, investimentoParaAtualizar.TOTAL_INVESTIDO);
                isPodeCadastrarMovimentacao = yield (0, AtualizaInvestimento_1.default)(investimento);
            }
            if (isPodeCadastrarMovimentacao === true) {
                yield (con === null || con === void 0 ? void 0 : con.execute(sql_CriaMovimentacao));
                result = { isSucesso: true, message: 'Ativo inserido com sucesso!' };
                return result;
            }
            else {
                return result;
            }
        }
        catch (error) {
            console.log('[ERROR] - CadastraMovimentacao: ', error);
            throw false;
        }
        finally {
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
exports.default = CadastraMovimentacao;
