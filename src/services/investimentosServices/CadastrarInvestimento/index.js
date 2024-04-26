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
const index_1 = __importDefault(require("../../../models/movimentacaoModel/index"));
const google_1 = __importDefault(require("../../../api/google"));
const FiltraAtivoByPapel_1 = __importDefault(require("../../../utils/FiltraAtivoByPapel"));
function cadastraInvestimento(investimentoMovimentacao) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        try {
            // const listaGoogle = await LerGoogleSheet();
            // const investimento = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL);
            const sql_pesquisaInvestimento = `SELECT * FROM INVESTIMENTOS WHERE USUARIO_ID = ? AND PAPEL = ? LIMIT 1`;
            const queryResult = yield (con === null || con === void 0 ? void 0 : con.execute(sql_pesquisaInvestimento, [investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.PAPEL]));
            const investimento = queryResult[0];
            if (investimento.length > 0) {
                //console.log('Aqui irei cadastrar uma movimentacao e atualizar o investimento')
                // console.log(investimento.response)
                const response = yield CadastrarInvestimentoExistente(investimentoMovimentacao);
                return response;
            }
            else {
                console.log('Aqui irei cadastrar o investimento e uma movimentação');
                const response = yield CadastraInvestimentoNovo(investimentoMovimentacao);
                return response;
            }
        }
        catch (error) {
            throw new Error('[cadastraInvestimento] - : Não Foi possível executar a logica de cadastrar investimento.');
        }
        finally {
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
function CadastraInvestimentoNovo(investimentoMovimentacao) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const con = yield (0, database_1.default)();
        try {
            const listaGoogle = yield (0, google_1.default)();
            const ativo = (0, FiltraAtivoByPapel_1.default)(listaGoogle, investimentoMovimentacao.PAPEL);
            if (ativo.isSucesso) {
                let nomeEmpresa = (_a = ativo.ativo) === null || _a === void 0 ? void 0 : _a.nome;
                let tipoAtivoID = (_b = ativo.ativo) === null || _b === void 0 ? void 0 : _b.tipo;
                investimentoMovimentacao.TIPO_ATIVO_ID = tipoAtivoID;
                let total = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
                const investimento = new investimentosModel_1.default(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL, nomeEmpresa, investimentoMovimentacao.SETOR, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total);
                /**SQL PARA CRIAR UM INVESTIMENTO NOVO */
                const sql_CriaInvestimento = yield investimentosModel_1.default.CriaInvestimento(investimento.USUARIO_ID, investimento.TIPO_ATIVO_ID, investimento.PAPEL, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
                yield (con === null || con === void 0 ? void 0 : con.execute(sql_CriaInvestimento));
                /** PEGA INVESTIMENTO CRIADO */
                const sqlInvestimentoExistente = yield investimentosModel_1.default.GetInvestimentos(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL);
                const investimentoCriado = yield (con === null || con === void 0 ? void 0 : con.execute(sqlInvestimentoExistente));
                const investimentoId = investimentoCriado[0][0].ID;
                /** CRIA MOVIMENTAÇÃO*/
                const movimentacao = new index_1.default(0, investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA, new Date());
                const sqlCriaMovimentacao = yield index_1.default.Criamovimentacao(movimentacao.INVESTIMENTOS_ID, movimentacao.QUANTIDADE, movimentacao.PRECO, movimentacao.TOTAL, movimentacao.DATA_MOVIMENTACAO, movimentacao.isCOMPRA, movimentacao.isVENDA);
                const movimentacaoCriada = yield (con === null || con === void 0 ? void 0 : con.execute(sqlCriaMovimentacao));
                return { isSucesso: true, message: 'Investimento criado com sucesso' };
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
function CadastrarInvestimentoExistente(investimentoMovimentacao) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        let totalAtualizado;
        let quantidadeAtualizada;
        let precoMedioAtualizado;
        try {
            const SqlPesquisaInvestimento = yield investimentosModel_1.default.GetInvestimentos(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL);
            const investimentoExistente = yield (con === null || con === void 0 ? void 0 : con.execute(SqlPesquisaInvestimento));
            // CAPTURAR O ID DO INVESTIMENTO
            const investimentoId = investimentoExistente[0][0].ID;
            const investimento = investimentoExistente[0][0];
            // VERIFICAR SE É COMPRA OU VENDA 
            if (investimentoMovimentacao.isCOMPRA) {
                // SE FOR COMPRA CRIAR MOVIMENTACAO FAZENDO A SOMA E ATUALIZANDO O INVESTIMENTO
                totalAtualizado = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
                quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE + investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
                precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;
                /** CRIA MOVIMENTACAO */
                const sql_movimentacaoCompra = yield index_1.default.Criamovimentacao(investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, totalAtualizado, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA);
                const movimentacaoCompra = yield (con === null || con === void 0 ? void 0 : con.execute(sql_movimentacaoCompra));
                /** ATUALIZA INVESTIMENTO */
                investimento.QUANTIDADE += investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
                investimento.TOTAL_INVESTIDO += totalAtualizado;
                investimento.PRECO_MEDIO = investimento.TOTAL_INVESTIDO / investimento.QUANTIDADE;
                const sql_InvestimentoUpdate = yield investimentosModel_1.default.AtualizaInvestimentos(investimentoId, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
                const investimentoAtualizado = yield (con === null || con === void 0 ? void 0 : con.execute(sql_InvestimentoUpdate));
                return { isSucesso: true, message: 'Compra realizada com sucesso!' };
            }
            else {
                // SE FOR VENDA CRIAR A MOVIMENTACAO FAZENDO A SUBTRAÇÃO E ATUALIZAR O INVESTIMENTO   
                totalAtualizado = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
                quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE - investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
                precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;
                /** CRIA MOVIMENTAÇÃO */
                const sql_movimentacaoVenda = yield index_1.default.Criamovimentacao(investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, totalAtualizado, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA);
                const movimentacaoVenda = yield (con === null || con === void 0 ? void 0 : con.execute(sql_movimentacaoVenda));
                /** ATUALIZA INVESTIMENTO */
                investimento.QUANTIDADE -= investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
                investimento.TOTAL_INVESTIDO -= totalAtualizado;
                investimento.PRECO_MEDIO = investimento.TOTAL_INVESTIDO / investimento.QUANTIDADE;
                const sql_InvestimentoUpdate = yield investimentosModel_1.default.AtualizaInvestimentos(investimentoId, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
                const investimentoAtualizado = yield (con === null || con === void 0 ? void 0 : con.execute(sql_InvestimentoUpdate));
                return { isSucesso: true, message: 'Venda realizada com sucesso!' };
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
exports.default = cadastraInvestimento;
