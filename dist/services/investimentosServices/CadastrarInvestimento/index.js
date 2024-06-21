"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const investimentosModel_1 = __importDefault(require("../../../models/investimentosModel"));
const index_1 = __importDefault(require("../../../models/movimentacaoModel/index"));
const google_1 = __importDefault(require("../../../externos/google"));
const FiltraAtivoByPapel_1 = __importDefault(require("../../../utils/FiltraAtivoByPapel"));
async function cadastraInvestimento(investimentoMovimentacao) {
    const con = await (0, database_1.default)();
    try {
        // const listaGoogle = await LerGoogleSheet();
        //const investimento = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL);
        const sql_pesquisaInvestimento = `SELECT * FROM INVESTIMENTOS WHERE USUARIO_ID = ? AND PAPEL = ? LIMIT 1`;
        const queryResult = await con?.execute(sql_pesquisaInvestimento, [investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.PAPEL]);
        const investimento = queryResult[0];
        if (investimento.length > 0) {
            //console.log('Aqui irei cadastrar uma movimentacao e atualizar o investimento')
            // console.log(investimento.response)
            const response = await CadastrarInvestimentoExistente(investimentoMovimentacao);
            return response;
        }
        else {
            console.log('Aqui irei cadastrar o investimento e uma movimentação');
            const response = await CadastraInvestimentoNovo(investimentoMovimentacao);
            return response;
        }
    }
    catch (error) {
        throw new Error('[cadastraInvestimento] - : Não Foi possível executar a logica de cadastrar investimento.');
    }
    finally {
        await con?.end();
    }
}
async function CadastraInvestimentoNovo(investimentoMovimentacao) {
    const con = await (0, database_1.default)();
    try {
        const listaGoogle = await (0, google_1.default)();
        const ativo = (0, FiltraAtivoByPapel_1.default)(listaGoogle, investimentoMovimentacao.PAPEL);
        if (ativo.isSucesso) {
            let nomeEmpresa = ativo.ativo?.nome;
            let tipoAtivoID = ativo.ativo?.tipo;
            investimentoMovimentacao.TIPO_ATIVO_ID = tipoAtivoID;
            let total = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
            const investimento = new investimentosModel_1.default(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL, nomeEmpresa, investimentoMovimentacao.SETOR, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total);
            /**SQL PARA CRIAR UM INVESTIMENTO NOVO */
            const sql_CriaInvestimento = await investimentosModel_1.default.CriaInvestimento(investimento.USUARIO_ID, investimento.TIPO_ATIVO_ID, investimento.PAPEL, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            await con?.execute(sql_CriaInvestimento);
            /** PEGA INVESTIMENTO CRIADO */
            const sqlInvestimentoExistente = await investimentosModel_1.default.GetInvestimentos(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL);
            const investimentoCriado = await con?.execute(sqlInvestimentoExistente);
            const investimentoId = investimentoCriado[0][0].ID;
            /** CRIA MOVIMENTAÇÃO*/
            const movimentacao = new index_1.default(0, investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA, new Date());
            const sqlCriaMovimentacao = await index_1.default.Criamovimentacao(movimentacao.INVESTIMENTOS_ID, movimentacao.QUANTIDADE, movimentacao.PRECO, movimentacao.TOTAL, movimentacao.DATA_MOVIMENTACAO, movimentacao.isCOMPRA, movimentacao.isVENDA);
            const movimentacaoCriada = await con?.execute(sqlCriaMovimentacao);
            return { isSucesso: true, message: 'Investimento criado com sucesso' };
        }
        else {
            return { isSucesso: false, message: 'Ops.. Ativo não encontrado, verifique se o código digitado esta correto!' };
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await con?.end();
    }
}
async function CadastrarInvestimentoExistente(investimentoMovimentacao) {
    const con = await (0, database_1.default)();
    let totalAtualizado;
    let quantidadeAtualizada;
    let precoMedioAtualizado;
    try {
        const SqlPesquisaInvestimento = await investimentosModel_1.default.GetInvestimentos(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL);
        const investimentoExistente = await con?.execute(SqlPesquisaInvestimento);
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
            const sql_movimentacaoCompra = await index_1.default.Criamovimentacao(investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, totalAtualizado, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA);
            const movimentacaoCompra = await con?.execute(sql_movimentacaoCompra);
            /** ATUALIZA INVESTIMENTO */
            investimento.QUANTIDADE += investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
            investimento.TOTAL_INVESTIDO += totalAtualizado;
            investimento.PRECO_MEDIO = investimento.TOTAL_INVESTIDO / investimento.QUANTIDADE;
            const sql_InvestimentoUpdate = await investimentosModel_1.default.AtualizaInvestimentos(investimentoId, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate);
            return { isSucesso: true, message: 'Compra realizada com sucesso!' };
        }
        else {
            /*VERIFICA SE QUANTIDADE INFORMADA É MENOR OU IGUAL A QUANTIDADE QUE USUÁRIO TEM EM SUA CARTEIRA */
            if (investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO > investimento.QUANTIDADE) {
                return { isSucesso: false, message: 'Ops... A quantidade informada é maior que a permitida para venda, verifique!' };
            }
            else {
                // SE FOR VENDA CRIAR A MOVIMENTACAO FAZENDO A SUBTRAÇÃO E ATUALIZAR O INVESTIMENTO   
                totalAtualizado = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
                quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE - investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
                precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;
                /** CRIA MOVIMENTAÇÃO */
                const sql_movimentacaoVenda = await index_1.default.Criamovimentacao(investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, totalAtualizado, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA);
                const movimentacaoVenda = await con?.execute(sql_movimentacaoVenda);
                /** ATUALIZA INVESTIMENTO */
                investimento.QUANTIDADE -= investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
            }
            if (investimento.QUANTIDADE === 0) {
                investimento.TOTAL_INVESTIDO = 0;
                investimento.PRECO_MEDIO = 0;
            }
            else {
                investimento.TOTAL_INVESTIDO -= totalAtualizado;
                investimento.PRECO_MEDIO = investimento.TOTAL_INVESTIDO / investimento.QUANTIDADE;
            }
            const sql_InvestimentoUpdate = await investimentosModel_1.default.AtualizaInvestimentos(investimentoId, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate);
            return { isSucesso: true, message: 'Venda realizada com sucesso!' };
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await con?.end();
    }
}
exports.default = cadastraInvestimento;
