"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = __importDefault(require("../../externos/google"));
const database_1 = __importDefault(require("../../database"));
const investimentosModel_1 = __importDefault(require("../../models/investimentosModel"));
const FiltraAtivoByPapel_1 = __importDefault(require("../../utils/FiltraAtivoByPapel"));
const movimentacaoModel_1 = __importDefault(require("../../models/movimentacaoModel"));
const FormataDataSalvarBanco_1 = __importDefault(require("../../utils/FormataDataSalvarBanco"));
const GravaLog_1 = __importDefault(require("../GravaLog"));
async function ImportarPlanilha(USUARIO_ID, listaPlanilhaImportacao) {
    const con = await (0, database_1.default)();
    const sqlPesquisaInvestimento = `SELECT * FROM INVESTIMENTOS WHERE USUARIO_ID = ? AND PAPEL = ? LIMIT 1`;
    try {
        const listaGoogle = await (0, google_1.default)();
        for (const item of listaPlanilhaImportacao) {
            let papel = item.papel.toUpperCase();
            let dataAjustada = (0, FormataDataSalvarBanco_1.default)(item.data);
            let preco = item.preco.replace(',', '.');
            let usuarioID = USUARIO_ID;
            let tipoAtivoId = 0; //sera passado na outra lógica.
            papel = papel.trim();
            let setor = '';
            let quantidadeMovimentacao = parseInt(item.quantidade);
            let DataCompra = dataAjustada;
            let isCOMPRA = true;
            let isVENDA = false;
            // const investimento = await PesquisaInvestimento(0,USUARIO_ID, 0, papel)
            let queryResult = await con?.execute(sqlPesquisaInvestimento, [USUARIO_ID, papel]);
            let investimento = queryResult[0];
            console.log(investimento.length);
            if (investimento.length > 0) {
                console.log('Aqui irei cadastrar uma movimentacao e atualizar o investimento');
                // console.log(investimento.response)
                const response = await CadastrarInvestimentoExistente(usuarioID, tipoAtivoId, papel, setor, quantidadeMovimentacao, preco, DataCompra, isCOMPRA, isVENDA);
            }
            else {
                console.log('Aqui irei cadastrar o investimento e uma movimentação');
                const teste = await CadastraInvestimentoNovo(listaGoogle, usuarioID, tipoAtivoId, papel, setor, quantidadeMovimentacao, preco, DataCompra, isCOMPRA, isVENDA);
                // return teste
            }
        }
        return { isSucesso: true, message: 'Lista Inserida com sucesso!' };
    }
    catch (error) {
        console.log('[ERROR] - ImportarPlanilha: ', error);
        await (0, GravaLog_1.default)(`ImportarPlanilha - ${error}`);
        return { isSucesso: false, message: 'Ops.. Não foi possivel completar importação da planilha, verifique os dados e tente novamente!' };
    }
    finally {
        await con?.end();
    }
}
async function CadastraInvestimentoNovo(listaGoogle, USUARIO_ID, TIPO_ATIVO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA) {
    const con = await (0, database_1.default)();
    try {
        const ativo = (0, FiltraAtivoByPapel_1.default)(listaGoogle, PAPEL);
        if (ativo.isSucesso) {
            let nomeEmpresa = ativo.ativo?.nome;
            let tipoAtivoID = ativo.ativo?.tipo;
            TIPO_ATIVO_ID = tipoAtivoID;
            let total = QUANTIDADE_MOVIMENTACAO * PRECO;
            const investimento = new investimentosModel_1.default(0, USUARIO_ID, TIPO_ATIVO_ID, PAPEL, nomeEmpresa, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, total);
            /**SQL PARA CRIAR UM INVESTIMENTO NOVO */
            const sql_CriaInvestimento = await investimentosModel_1.default.CriaInvestimento(investimento.USUARIO_ID, investimento.TIPO_ATIVO_ID, investimento.PAPEL, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            await con?.execute(sql_CriaInvestimento);
            /** PEGA INVESTIMENTO CRIADO */
            const sqlInvestimentoExistente = await investimentosModel_1.default.GetInvestimentos(0, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
            const investimentoCriado = await con?.execute(sqlInvestimentoExistente);
            const investimentoId = investimentoCriado[0][0].ID;
            /** CRIA MOVIMENTAÇÃO*/
            // const movimentacao: Movimentacoes = new Movimentacoes(0, investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, total, 
            //                                         DATA_COMPRA, isCOMPRA, isVENDA, new Date())
            const sqlCriaMovimentacao = await movimentacaoModel_1.default.Criamovimentacao(investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, total, DATA_COMPRA, isCOMPRA, isVENDA);
            const movimentacaoCriada = await con?.execute(sqlCriaMovimentacao);
            return { isSucesso: true, message: 'Criado com sucesso' };
        }
    }
    catch (error) {
        console.log('[CadastraInvestimentoNovo] - ', error);
    }
    finally {
        await con?.end();
    }
}
async function CadastrarInvestimentoExistente(USUARIO_ID, TIPO_ATIVO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA) {
    const con = await (0, database_1.default)();
    let totalAtualizado;
    let quantidadeAtualizada;
    let precoMedioAtualizado;
    try {
        const SqlPesquisaInvestimento = await investimentosModel_1.default.GetInvestimentos(0, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
        const investimentoExistente = await con?.execute(SqlPesquisaInvestimento);
        // CAPTURAR O ID DO INVESTIMENTO
        const investimentoId = investimentoExistente[0][0].ID;
        // console.log(investimentoId)
        // VERIFICAR SE É COMPRA OU VENDA 
        if (isCOMPRA) {
            // SE FOR COMPRA CRIAR MOVIMENTACAO FAZENDO A SOMA E ATUALIZANDO O INVESTIMENTO
            totalAtualizado = (QUANTIDADE_MOVIMENTACAO * PRECO) + investimentoExistente[0][0].TOTAL_INVESTIDO;
            quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE + QUANTIDADE_MOVIMENTACAO;
            precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;
            /** CRIA MOVIMENTACAO */
            const sql_movimentacaoCompra = await movimentacaoModel_1.default.Criamovimentacao(investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, QUANTIDADE_MOVIMENTACAO * PRECO, DATA_COMPRA, isCOMPRA, isVENDA);
            const movimentacaoCompra = await con?.execute(sql_movimentacaoCompra);
            /** ATUALIZA INVESTIMENTO */
            const sql_InvestimentoUpdate = await investimentosModel_1.default.AtualizaInvestimentos(investimentoId, quantidadeAtualizada, precoMedioAtualizado, totalAtualizado);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate);
        }
        else {
            // SE FOR VENDA CRIAR A MOVIMENTACAO FAZENDO A SUBTRAÇÃO E ATUALIZAR O INVESTIMENTO   
            totalAtualizado = investimentoExistente[0][0].TOTAL_INVESTIDO - (QUANTIDADE_MOVIMENTACAO * PRECO);
            quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE - QUANTIDADE_MOVIMENTACAO;
            precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;
            /** CRIA MOVIMENTAÇÃO */
            const sql_movimentacaoVenda = await movimentacaoModel_1.default.Criamovimentacao(investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, QUANTIDADE_MOVIMENTACAO * PRECO, DATA_COMPRA, isCOMPRA, isVENDA);
            const movimentacaoVenda = await con?.execute(sql_movimentacaoVenda);
            /** ATUALIZA INVESTIMENTO */
            const sql_InvestimentoUpdate = await investimentosModel_1.default.AtualizaInvestimentos(investimentoId, quantidadeAtualizada, precoMedioAtualizado, totalAtualizado);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate);
        }
    }
    catch (error) {
        console.log('[CadastrarInvestimentoExistente] - ' + error);
    }
    finally {
        await con?.end();
    }
}
exports.default = ImportarPlanilha;
