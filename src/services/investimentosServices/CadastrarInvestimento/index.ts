import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';

async function CadastrarInvestimentos(){
    const con = await db(); 
    try {
        const investimento = new Investimentos(1, 'VALE3', 1,10, 10)
        const result = investimento.CriaInvestimento(investimento.USUARIO_ID, investimento.PAPEL, investimento.QUANTIDADE, investimento.PRECO_MEDIO, investimento.TOTAL_INVESTIDO)
        console.log(result)
        return {isSucesso: true, message: 'Investimento inserido com sucesso!'}
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Erro ', error}
    }
}


export default CadastrarInvestimentos;