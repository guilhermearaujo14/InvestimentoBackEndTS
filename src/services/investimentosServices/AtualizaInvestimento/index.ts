import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';

async function AtualizaInvestimento(investimentos: Investimentos){
    const con = await db();
    try {
        
    } catch (error) {
        console.log('[ERROR] - AtualizaInvestimento: ',error);
        return false
    }

}

export default AtualizaInvestimento;