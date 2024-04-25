import LerGoogleSheet from '../../api/google';
import db from '../../database';
import investimentoMovimentacao from '../../interface/InvestimentoMovimentacao';
import PlanilhaImportacao from '../../interface/planilhaImportacao';
import Investimentos from '../../models/investimentosModel';
import CadastrarInvestimentos from '../investimentosServices/CadastrarInvestimento';
import PesquisaInvestimento from '../../services/investimentosServices/PesquisaInvestimento/index';
import FiltraAtivoByPapel from '../../utils/FiltraAtivoByPapel';
import Movimentacoes from '../../models/movimentacaoModel';
import FormataDataSalvar from '../../utils/FormataDataSalvarBanco';


async function ImportarPlanilha(USUARIO_ID: number, listaPlanilhaImportacao:any[]){
    const con = await db();
    const sqlPesquisaInvestimento = `SELECT * FROM INVESTIMENTOS WHERE USUARIO_ID = ? AND PAPEL = ? LIMIT 1`;
    try {
        const listaGoogle = await LerGoogleSheet();
        for(const item of listaPlanilhaImportacao){
            let papel: string = item.papel.toUpperCase();
            let dataAjustada: any = FormataDataSalvar(item.data);
            let preco: number = item.preco.replace(',','.')
                let usuarioID = USUARIO_ID;
                let tipoAtivoId =  0 //sera passado na outra lógica.
                papel = papel.trim()
                let setor = ''
                let quantidadeMovimentacao = parseInt(item.quantidade)
                let DataCompra = dataAjustada
                let isCOMPRA = true
                let isVENDA = false
            
            // const investimento = await PesquisaInvestimento(0,USUARIO_ID, 0, papel)
            let queryResult: any = await con?.execute(sqlPesquisaInvestimento, [USUARIO_ID, papel]);

            let investimento = queryResult[0]
            console.log(investimento.length)
            if(investimento.length > 0){
                console.log('Aqui irei cadastrar uma movimentacao e atualizar o investimento')
                // console.log(investimento.response)
                const response = await CadastrarInvestimentoExistente(usuarioID, tipoAtivoId, papel, setor, quantidadeMovimentacao, preco, DataCompra, isCOMPRA, isVENDA)
            }else{
                console.log('Aqui irei cadastrar o investimento e uma movimentação');
                const teste = await CadastraInvestimentoNovo(listaGoogle, usuarioID, tipoAtivoId, papel, setor, quantidadeMovimentacao, preco, DataCompra, isCOMPRA, isVENDA )
                // return teste
            }
        }

        return {isSucesso: true, message: 'Lista Inserida com sucesso!'}
    } catch (error) {
        console.log('[ERROR] - ImportarPlanilha: ', error)
        return {isSucesso: false, message: 'Ops.. Não foi possivel completar importação da planilha, verifique os dados e tente novamente!'}
    }finally{
        await con?.end();
    }

}



async function CadastraInvestimentoNovo(listaGoogle: any, USUARIO_ID: number, TIPO_ATIVO_ID: number, PAPEL: string, SETOR: string, QUANTIDADE_MOVIMENTACAO: number, PRECO: number, DATA_COMPRA: Date, isCOMPRA: boolean, isVENDA: boolean){
    const con = await db();
    try {
        const ativo = FiltraAtivoByPapel(listaGoogle, PAPEL);

        if(ativo.isSucesso){
            let nomeEmpresa: any = ativo.ativo?.nome;
            let tipoAtivoID: any = ativo.ativo?.tipo;
            TIPO_ATIVO_ID = tipoAtivoID;
            let total = QUANTIDADE_MOVIMENTACAO * PRECO;
            const investimento: Investimentos = new Investimentos(0, USUARIO_ID, TIPO_ATIVO_ID, PAPEL, nomeEmpresa, 
                                                                SETOR, QUANTIDADE_MOVIMENTACAO, PRECO,total);
            /**SQL PARA CRIAR UM INVESTIMENTO NOVO */
            const sql_CriaInvestimento = await Investimentos.CriaInvestimento(investimento.USUARIO_ID, investimento.TIPO_ATIVO_ID, investimento.PAPEL, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO);
            await con?.execute(sql_CriaInvestimento)
            
            /** PEGA INVESTIMENTO CRIADO */
            const sqlInvestimentoExistente = await Investimentos.GetInvestimentos(0, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
            const investimentoCriado: any = await con?.execute(sqlInvestimentoExistente);
            const investimentoId = investimentoCriado[0][0].ID
            
            /** CRIA MOVIMENTAÇÃO*/
            // const movimentacao: Movimentacoes = new Movimentacoes(0, investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, total, 
            //                                         DATA_COMPRA, isCOMPRA, isVENDA, new Date())

            const sqlCriaMovimentacao = await Movimentacoes.Criamovimentacao(investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, total, DATA_COMPRA, 
                                                                            isCOMPRA, isVENDA);
            const movimentacaoCriada = await con?.execute(sqlCriaMovimentacao);
            
            return {isSucesso: true, message: 'Criado com sucesso'}
        }

    } catch (error) {
        console.log('[CadastraInvestimentoNovo] - ',error)
    }finally{
        await con?.end();
    }
}


async function CadastrarInvestimentoExistente(USUARIO_ID: number, TIPO_ATIVO_ID: number, PAPEL: string, SETOR: string, QUANTIDADE_MOVIMENTACAO: number, PRECO: number, DATA_COMPRA: Date, isCOMPRA: boolean, isVENDA: boolean){
    const con = await db();
    let totalAtualizado: number;
    let quantidadeAtualizada: number;
    let precoMedioAtualizado: number;
    try {
        const SqlPesquisaInvestimento = await Investimentos.GetInvestimentos(0, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
        const investimentoExistente: any = await con?.execute(SqlPesquisaInvestimento)
        
        // CAPTURAR O ID DO INVESTIMENTO
        const investimentoId = investimentoExistente[0][0].ID;
        // console.log(investimentoId)
        
        // VERIFICAR SE É COMPRA OU VENDA 
        if(isCOMPRA){
            // SE FOR COMPRA CRIAR MOVIMENTACAO FAZENDO A SOMA E ATUALIZANDO O INVESTIMENTO
            totalAtualizado = (QUANTIDADE_MOVIMENTACAO * PRECO) + investimentoExistente[0][0].TOTAL_INVESTIDO;
            quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE + QUANTIDADE_MOVIMENTACAO;
            precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;

            /** CRIA MOVIMENTACAO */
            const sql_movimentacaoCompra = await Movimentacoes.Criamovimentacao(investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, totalAtualizado, 
                                                                            DATA_COMPRA, isCOMPRA, isVENDA);
            const movimentacaoCompra = await con?.execute(sql_movimentacaoCompra);

            /** ATUALIZA INVESTIMENTO */
            const sql_InvestimentoUpdate = await Investimentos.AtualizaInvestimentos(investimentoId, quantidadeAtualizada, precoMedioAtualizado, totalAtualizado);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate)

        }else{
            // SE FOR VENDA CRIAR A MOVIMENTACAO FAZENDO A SUBTRAÇÃO E ATUALIZAR O INVESTIMENTO   
            totalAtualizado = investimentoExistente[0][0].TOTAL_INVESTIDO - (QUANTIDADE_MOVIMENTACAO * PRECO);
            quantidadeAtualizada = investimentoExistente[0][0].QUANTIDADE - QUANTIDADE_MOVIMENTACAO;
            precoMedioAtualizado = totalAtualizado / quantidadeAtualizada;
            
            /** CRIA MOVIMENTAÇÃO */
            const sql_movimentacaoVenda = await Movimentacoes.Criamovimentacao(investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, totalAtualizado, 
                                                                                DATA_COMPRA, isCOMPRA, isVENDA);
            const movimentacaoVenda = await con?.execute(sql_movimentacaoVenda);

            /** ATUALIZA INVESTIMENTO */
            const sql_InvestimentoUpdate = await Investimentos.AtualizaInvestimentos(investimentoId, quantidadeAtualizada, precoMedioAtualizado, totalAtualizado);
            const investimentoAtualizado = await con?.execute(sql_InvestimentoUpdate)

        }

    } catch (error) {
        console.log('[CadastrarInvestimentoExistente] - '+error)
    }finally{
        await con?.end();
    }
}

export default ImportarPlanilha