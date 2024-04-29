import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import Pesquisainvestimento from '../PesquisaInvestimento';
import investimentoMovimentacao from '../../../interface/InvestimentoMovimentacao/index';
import CadastraMovimentacao from '../../movimentacoesServices/CadastraMovimentacao';
import Movimentacoes from '../../../models/movimentacaoModel/index';
import LerGoogleSheet from '../../../externos/google';
import FiltraAtivoByPapel, { listaInterface } from '../../../utils/FiltraAtivoByPapel';
import ExibeMeusInvestimentos from '../../../controllers/investimentosController/ExibeMeusInvestimentos/index';


async function cadastraInvestimento(investimentoMovimentacao: investimentoMovimentacao){
    const con = await db();
    try {
        // const listaGoogle = await LerGoogleSheet();
        // const investimento = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL);
        const sql_pesquisaInvestimento = `SELECT * FROM INVESTIMENTOS WHERE USUARIO_ID = ? AND PAPEL = ? LIMIT 1`;
        const queryResult: any = await con?.execute(sql_pesquisaInvestimento,[investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.PAPEL])
        const investimento = queryResult[0];
        if(investimento.length > 0){
            //console.log('Aqui irei cadastrar uma movimentacao e atualizar o investimento')
            // console.log(investimento.response)
            const response = await CadastrarInvestimentoExistente(investimentoMovimentacao)
            return response
        }else{
            console.log('Aqui irei cadastrar o investimento e uma movimentação');
            const response = await CadastraInvestimentoNovo(investimentoMovimentacao)
            return response
        }
    } catch (error) {
        throw new Error('[cadastraInvestimento] - : Não Foi possível executar a logica de cadastrar investimento.')
    }finally{
       await con?.end();
    }
}

async function CadastraInvestimentoNovo(investimentoMovimentacao: investimentoMovimentacao){
    const con = await db();
    try {
        const listaGoogle = await LerGoogleSheet();
        const ativo = FiltraAtivoByPapel(listaGoogle, investimentoMovimentacao.PAPEL);

        if(ativo.isSucesso){
            let nomeEmpresa: any = ativo.ativo?.nome;
            let tipoAtivoID: any = ativo.ativo?.tipo;
            investimentoMovimentacao.TIPO_ATIVO_ID = tipoAtivoID;
            let total = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
            const investimento: Investimentos = new Investimentos(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL, nomeEmpresa, 
                                                                investimentoMovimentacao.SETOR, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO,total);
            /**SQL PARA CRIAR UM INVESTIMENTO NOVO */
            const sql_CriaInvestimento = await Investimentos.CriaInvestimento(investimento.USUARIO_ID, investimento.TIPO_ATIVO_ID, investimento.PAPEL, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            await con?.execute(sql_CriaInvestimento)
            
            /** PEGA INVESTIMENTO CRIADO */
            const sqlInvestimentoExistente = await Investimentos.GetInvestimentos(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL);
            const investimentoCriado: any = await con?.execute(sqlInvestimentoExistente);
            const investimentoId = investimentoCriado[0][0].ID
            
            /** CRIA MOVIMENTAÇÃO*/
            const movimentacao: Movimentacoes = new Movimentacoes(0, investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total, 
                                                    investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA, new Date())
            const sqlCriaMovimentacao = await Movimentacoes.Criamovimentacao(movimentacao.INVESTIMENTOS_ID, movimentacao.QUANTIDADE, movimentacao.PRECO, movimentacao.TOTAL, movimentacao.DATA_MOVIMENTACAO, 
                                                                            movimentacao.isCOMPRA, movimentacao.isVENDA);
            const movimentacaoCriada = await con?.execute(sqlCriaMovimentacao);
            
            return {isSucesso: true, message: 'Investimento criado com sucesso'}
        }

    } catch (error) {
        console.log(error)
    }finally{
       await con?.end();
    }
}


async function CadastrarInvestimentoExistente(investimentoMovimentacao: investimentoMovimentacao){
    const con = await db();
    let totalAtualizado: number;
    let quantidadeAtualizada: number;
    let precoMedioAtualizado: number;
    try {
        const SqlPesquisaInvestimento = await Investimentos.GetInvestimentos(0, investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL);
        const investimentoExistente: any = await con?.execute(SqlPesquisaInvestimento)
        
        // CAPTURAR O ID DO INVESTIMENTO
        const investimentoId = investimentoExistente[0][0].ID;
        const investimento: Investimentos = investimentoExistente[0][0]
        
        
        // VERIFICAR SE É COMPRA OU VENDA 
        if(investimentoMovimentacao.isCOMPRA){
            // SE FOR COMPRA CRIAR MOVIMENTACAO FAZENDO A SOMA E ATUALIZANDO O INVESTIMENTO
            totalAtualizado = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
            quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE + investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
            precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;

            /** CRIA MOVIMENTACAO */
            const sql_movimentacaoCompra = await Movimentacoes.Criamovimentacao(investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, totalAtualizado, 
                                                                            investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA);
            const movimentacaoCompra = await con?.execute(sql_movimentacaoCompra);

            /** ATUALIZA INVESTIMENTO */
            investimento.QUANTIDADE +=  investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
            investimento.TOTAL_INVESTIDO += totalAtualizado
            investimento.PRECO_MEDIO = investimento.TOTAL_INVESTIDO / investimento.QUANTIDADE;

            const sql_InvestimentoUpdate = await Investimentos.AtualizaInvestimentos(investimentoId, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate)
            return {isSucesso: true, message: 'Compra realizada com sucesso!'}
        }else{
            // SE FOR VENDA CRIAR A MOVIMENTACAO FAZENDO A SUBTRAÇÃO E ATUALIZAR O INVESTIMENTO   
            totalAtualizado = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
            quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE - investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
            precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;
            
            /** CRIA MOVIMENTAÇÃO */
            const sql_movimentacaoVenda = await Movimentacoes.Criamovimentacao(investimentoId, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, totalAtualizado, 
                                                                                investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA);
            const movimentacaoVenda = await con?.execute(sql_movimentacaoVenda);

            /** ATUALIZA INVESTIMENTO */
            investimento.QUANTIDADE -=  investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO;
            investimento.TOTAL_INVESTIDO -= totalAtualizado
            investimento.PRECO_MEDIO = investimento.TOTAL_INVESTIDO / investimento.QUANTIDADE;

            const sql_InvestimentoUpdate = await Investimentos.AtualizaInvestimentos(investimentoId, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate)
            return {isSucesso: true, message: 'Venda realizada com sucesso!'}
        }
    } catch (error) {
        console.log(error)
    }finally{
        await con?.end();
    }
}


export default cadastraInvestimento    