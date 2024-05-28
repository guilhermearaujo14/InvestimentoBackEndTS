import db from '../../../database';
import Movimentacoes from '../../../models/movimentacaoModel';

async function PesquisaMovimentacaoById(ID: number){
    const con = await db();
    try {
        const sql = await Movimentacoes.PesquisaMovimentacaoPorId(ID);
        const response: any = await con?.execute(sql);
        return response[0];
    } catch (error) {
        
    }finally{
        await con?.end();
    }
}

export default PesquisaMovimentacaoById;