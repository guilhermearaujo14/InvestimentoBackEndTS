"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const investimentosModel_1 = __importDefault(require("../../../models/investimentosModel"));
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
const AtualizaInvestimento_1 = __importDefault(require("../../investimentosServices/AtualizaInvestimento"));
async function CadastraMovimentacao(movimentacoes, isUpdateInvestimento) {
    const con = await (0, database_1.default)();
    let result = [];
    let isPodeCadastrarMovimentacao = true;
    let isPodeAtualizar = false;
    try {
        const sql_CriaMovimentacao = await movimentacaoModel_1.default.Criamovimentacao(movimentacoes.INVESTIMENTOS_ID, movimentacoes.QUANTIDADE, movimentacoes.PRECO, movimentacoes.TOTAL, movimentacoes.DATA_MOVIMENTACAO, movimentacoes.isCOMPRA, movimentacoes.isVENDA);
        const sql_investimento = await investimentosModel_1.default.GetInvestimentos(movimentacoes.INVESTIMENTOS_ID, 0, 0, '');
        let resultadoPesquisa = await con?.execute(sql_investimento);
        let j = resultadoPesquisa?.[0];
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
            if (investimentoParaAtualizar.QUANTIDADE == 0) {
                console.log('Quantidade zero');
                investimentoParaAtualizar.PRECO_MEDIO = 0;
                investimentoParaAtualizar.TOTAL_INVESTIDO = 0;
            }
            else {
                investimentoParaAtualizar.TOTAL_INVESTIDO -= movimentacoes.TOTAL;
                investimentoParaAtualizar.PRECO_MEDIO = investimentoParaAtualizar.TOTAL_INVESTIDO / investimentoParaAtualizar.QUANTIDADE;
            }
        }
        console.log(investimentoParaAtualizar);
        if (isUpdateInvestimento == true && isPodeAtualizar == true) {
            const investimento = new investimentosModel_1.default(investimentoParaAtualizar.ID, investimentoParaAtualizar.USUARIO_ID, investimentoParaAtualizar.TIPO_ATIVO_ID, investimentoParaAtualizar.PAPEL, investimentoParaAtualizar.NOME_EMPRESA, investimentoParaAtualizar.SETOR, investimentoParaAtualizar.QUANTIDADE, investimentoParaAtualizar.PRECO_MEDIO, investimentoParaAtualizar.TOTAL_INVESTIDO);
            isPodeCadastrarMovimentacao = await (0, AtualizaInvestimento_1.default)(investimento);
        }
        if (isPodeCadastrarMovimentacao === true) {
            await con?.execute(sql_CriaMovimentacao);
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
        await con?.end();
    }
}
exports.default = CadastraMovimentacao;
