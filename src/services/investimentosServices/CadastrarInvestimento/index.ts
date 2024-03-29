import { QueryResult } from 'mysql2';
import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import Pesquisainvestimento from '../PesquisaInvestimento';
import investimentoMovimentacaoInterface from '../../../interface/InvestimentoMovimentacao/index';

async function CadastrarInvestimentos(investimentoMovimentacao: investimentoMovimentacaoInterface){
    const con = await db(); 
    try {
        const pesquisaAtivo: any = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL)
        console.log(pesquisaAtivo[0])
        
        
        if(pesquisaAtivo[0].length == 0 || pesquisaAtivo[0] === undefined){
            let total = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO*investimentoMovimentacao.PRECO
            
                 const sql = await Investimentos.CriaInvestimento(investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total);
                 const result = await con?.execute(sql);
                
                }else{

                }
                
                return {isSucesso: true, message: 'Investimento inserido com sucesso!'}    
        
        } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Erro ', error}
    }finally{
        con?.end();
    }
}


export default CadastrarInvestimentos;    