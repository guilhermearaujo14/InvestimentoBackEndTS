import db from '../../../database';
import Movimentacoes from '../../../models/movimentacaoModel';
import GravaLog from '../../GravaLog';
import CadastraMovimentacao from '../CadastraMovimentacao';
import ExcluirMovimentacao from '../ExcluiMovimentacao';

async function AtualizaMovimentacao(USUARIO_ID: number, MOVIMENTACAO_ID: number, PAPEL: string, SETOR: string, QUANTIDADE_MOVIMENTACAO: number, PRECO: number, DATA_COMPRA: Date, isCOMPRA: boolean, isVENDA: boolean){
    //movimentacao: Movimentacoes,
    const con = await db();
    const MovimentacaoID: any = MOVIMENTACAO_ID
    try {
        /** Encontro a movimentação desejada */
        const sql_movimentacao = `SELECT * FROM MOVIMENTACOES WHERE ID = ?`;
        const MovimentacaoResultadoPesquisa: any = await con?.execute(sql_movimentacao, [MovimentacaoID]);
        const movObj = MovimentacaoResultadoPesquisa[0][0]
        const investimentoId: number = movObj.INVESTIMENTOS_ID;
        console.log(movObj, investimentoId);


         /* Excluir a movimentação e atualizar o investimento */
         await ExcluirMovimentacao(USUARIO_ID, MovimentacaoID);

        /** Crio uma nova movimentação */
        let movimentacao = new Movimentacoes(0, investimentoId, QUANTIDADE_MOVIMENTACAO, PRECO, QUANTIDADE_MOVIMENTACAO*PRECO, DATA_COMPRA, isCOMPRA, isVENDA, new Date());
        await CadastraMovimentacao(movimentacao, true);
        
        return {isSucesso: true, message: 'Movimentação atualizada com sucesso!'}
    } catch (error) {
        console.log('[AtualizaMovimentacao] - ', error);
        await GravaLog(`[AtualizaMovimentacao] - ${error}`)
        return {isSucesso: false, message: 'Ops... não foi possivel atualizar movimentação.'}
    }

}

export default AtualizaMovimentacao