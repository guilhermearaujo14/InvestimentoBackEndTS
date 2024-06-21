import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import Movimentacoes from '../../../models/movimentacaoModel';
import GravaLog from '../../GravaLog';

async function ExcluirMovimentacao(USUARIO_ID: number, MOVIMENTACAO_ID: number){
    const con = await db();
    const sql_SearchMovimentacoes = 'SELECT * FROM MOVIMENTACOES WHERE ID = ?';
    const sql_SearchInvestimento = 'SELECT * FROM INVESTIMENTOS WHERE ID = ?';
    let total;
    let precoMedio; 
    try {
        /** ENCONTRA MOVIMENTACAO */
        const result: any = await con?.execute(sql_SearchMovimentacoes,[MOVIMENTACAO_ID]);
        const movimentacao: Movimentacoes = result[0][0];
        
        /** ENCONTRA INVESTIMENTO */
        const resultInvestimento: any = await con?.execute(sql_SearchInvestimento,[movimentacao.INVESTIMENTOS_ID]);
        const investimento: Investimentos = resultInvestimento[0][0];

        /** ATUALIZA INVESTIMENTO */
        const quantidade = investimento.QUANTIDADE - movimentacao.QUANTIDADE;
        if(quantidade === 0){
            total = 0;
            precoMedio = 0;
        }else{
             total = investimento.TOTAL_INVESTIDO - movimentacao.TOTAL;
             precoMedio = total / quantidade;
        }
        const sql_atualizaInvestimentos = await Investimentos.AtualizaInvestimentos(movimentacao.INVESTIMENTOS_ID, quantidade,precoMedio, total);
        await con?.execute(sql_atualizaInvestimentos);

        /** DELETA MOVIMENTAÇÃO */
        const sql_DeletaMovimentacao = await Movimentacoes.ExcluiMovimentacao(MOVIMENTACAO_ID);
        await con?.execute(sql_DeletaMovimentacao);

        return {isSucesso: true, message: 'Movimentação deletada com sucesso!'};

    } catch (error) {
        console.log(error)
        await GravaLog(`ExcluirMovimentacao - ${error}`)
        return {isSucesso: false, message: 'Ops... Houve um erro ao realizar operação de Excluir movimentaçao.'}
    }finally{
        await con?.end();
    }
}


export default ExcluirMovimentacao;