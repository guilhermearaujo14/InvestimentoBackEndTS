import db from '../../../database';
import Movimentacoes from '../../../models/movimentacaoModel';

async function PesquisaMovimentacaoById(ID: number){
const con = await db();
try {
    const sql = await Movimentacoes.PesquisaMovimentacaobyId(ID);
    console.log(sql);
    return {isSucesso: true}
} catch (error) {
    
}finally{
    await con?.end();
}
}

export default PesquisaMovimentacaoById;