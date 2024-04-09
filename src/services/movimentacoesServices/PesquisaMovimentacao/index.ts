import db from '../../../database';
import Movimentacoes from '../../../models/movimentacaoModel';

async function PesquisaMovimentacoes(USUARIO_ID: number, dataInicio?: string | undefined, dataFinal?: string | undefined, PAPEL?: string | undefined, TIPO_ATIVO_ID?: string){
    const con = await db();
    try {
        const sql = await Movimentacoes.PesquisaMovimentacao(USUARIO_ID, dataInicio, dataFinal, PAPEL, TIPO_ATIVO_ID);
        const response = await con?.execute(sql)

        return response

    } catch (error) {
        console.log('[ERROR] - PesquisaMovimentacao: ', error);
        return {isSucesso: false, message: 'Ops.. Não foi possivel trazer os dados desejados.'}
    }

}

export default PesquisaMovimentacoes;