import db from '../../../database';
import Movimentacoes from '../../../models/movimentacaoModel';
import GravaLog from '../../GravaLog';

async function AtualizaMovimentacao(movimentacao: Movimentacoes){
    const con = await db();
    try {
        /** ENCONTRAR MOVIMENTACAO QUE DEVERÁ SER ATUALIZADA */

        /** ENCONTRAR INVESTIMENTO */

        /** ATUALIZAR INVESTIMENTO */
    } catch (error) {
        console.log('[AtualizaMovimentacao] - ', error);
        await GravaLog(`[AtualizaMovimentacao] - ${error}`)
        return {isSucesso: false, message: 'Ops... não foi possivel atualizar movimentação.'}
    }

}

export default AtualizaMovimentacao