import { QueryResult } from 'mysql2';
import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import Pesquisainvestimento from '../PesquisaInvestimento';
import investimentoMovimentacaoInterface from '../../../interface/InvestimentoMovimentacao/index';
import CadastraMovimentacao from '../../movimentacoesServices/CadastraMovimentacao';
import Movimentacoes from '../../../models/movimentacaoModel/index';

async function CadastrarInvestimentos(investimentoMovimentacao: investimentoMovimentacaoInterface){
    const con = await db(); 
    let result: any
    try {
        const pesquisaAtivo: any = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL)
        
        if(pesquisaAtivo[0].length == 0 || pesquisaAtivo[0] === undefined){
            let total = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO*investimentoMovimentacao.PRECO

            const sql = await Investimentos.CriaInvestimento(investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total);
            result = await con?.execute(sql);
            
            const AtivoCadastrado: any = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL)
            const id_investimento: number = AtivoCadastrado[0][0].ID;//AQUI TENHO QUE COLOCAR O ID DO INVESTIMENTO QUE CRIEI.

            const movimentacao =  new Movimentacoes(0, id_investimento, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA, new Date());   
            const movimentacaoCadastrada = await CadastraMovimentacao(movimentacao);

        }else{
            console.log('Não crirou outro investimento ' + pesquisaAtivo[0][0].ID)
        }
                
            return {isSucesso: true, message: 'Investimento inserido com sucesso!', result}    
        
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Erro ', error};

    }finally{
       await con?.end();
    }
}


export default CadastrarInvestimentos;    