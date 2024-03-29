import db from '../../../database';
import movimentacoesModel from '../../../models/movimentacaoModel';

async function CadastraMovimentacao(movimentacoes: movimentacoesModel){
    const con = await db();
    try {
        const sql = await movimentacoesModel.Criamovimentacao(movimentacoes.INVESTIMENTOS_ID, movimentacoes.QUANTIDADE, movimentacoes.PRECO, movimentacoes.TOTAL, movimentacoes.DATA_MOVIMENTACAO, movimentacoes.isCOMPRA, movimentacoes.isVENDA)
        const result = await con?.execute(sql);
        return result
    } catch (error) {
        console.log('error ', error)
        return {isSucesso: false, message: 'Ops.. Nâo foi possivel cadastrar uma movimentação => '+ error};
    }finally{
        await con?.end()
    }
}

export default CadastraMovimentacao