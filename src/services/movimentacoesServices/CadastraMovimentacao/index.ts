import db from '../../../database';
import movimentacoesModel from '../../../models/movimentacaoModel';

async function CadastraMovimentacao(movimentacoes: movimentacoesModel){
    const con = await db();
    try {
        const sql = await movimentacoesModel.Criamovimentacao(movimentacoes.INVESTIMENTOS_ID, movimentacoes.QUANTIDADE, movimentacoes.PRECO, movimentacoes.TOTAL, movimentacoes.DATA_MOVIMENTACAO, movimentacoes.isCOMPRA, movimentacoes.isVENDA, movimentacoes.DATA_INCLUSAO)
        const result = con?.execute(sql);
        console.log('Movimentação ' +result)
        return result
    } catch (error) {
        console.log('error')
        return {isSucesso: false, message: 'Ops.. Nâo foi possivel cadastrar uma movimentação => '+ error};
    }finally{
        con?.end()
    }
}

export default CadastraMovimentacao