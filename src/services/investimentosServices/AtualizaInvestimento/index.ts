import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';


async function AtualizaInvestimento(investimento: Investimentos){
    const con = await db();
    try {
        
        const sql_UpdateInvestimento = await Investimentos.AtualizaInvestimentos(investimento.ID, investimento.QUANTIDADE, investimento.PRECO_MEDIO,investimento.TOTAL_INVESTIDO);
        const res = await con?.execute(sql_UpdateInvestimento);
        return true;
    } catch (error) {
        console.log('[ERROR] - AtualizaInvestimento: ',error); 
        return false
    }

}

export default  AtualizaInvestimento;