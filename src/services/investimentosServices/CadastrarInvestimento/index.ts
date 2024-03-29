import { QueryResult } from 'mysql2';
import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import Pesquisainvestimento from '../PesquisaInvestimento';
import investimentoMovimentacaoInterface from '../../../interface/InvestimentoMovimentacao/index';
import CadastraMovimentacao from '../../movimentacoesServices/CadastraMovimentacao';
import Movimentacoes from '../../../models/movimentacaoModel/index';

async function CadastrarInvestimentos(investimentoMovimentacao: investimentoMovimentacaoInterface){
    const con = await db(); 
    try {
        const pesquisaAtivo: any = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL)
        console.log(pesquisaAtivo[0])
        
        
        if(pesquisaAtivo[0].length == 0 || pesquisaAtivo[0] === undefined){
            let total = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO*investimentoMovimentacao.PRECO
            let dataInclusao = new Date()
                 
            const sql = await Investimentos.CriaInvestimento(investimentoMovimentacao.USUARIO_ID, investimentoMovimentacao.TIPO_ATIVO_ID, investimentoMovimentacao.PAPEL, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total);
            const result = await con?.execute(sql);
              console.log('Investimento: '+ result)   
            const id_investimento: number = 0;//AQUI TENHO QUE COLOCAR O ID DO INVESTIMENTO QUE CRIEI.
            const movimentacao = new Movimentacoes(0, id_investimento, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO, investimentoMovimentacao.PRECO, total, investimentoMovimentacao.DATA_COMPRA, investimentoMovimentacao.isCOMPRA, investimentoMovimentacao.isVENDA,dataInclusao);
                 
            const movimentacaoCadastrada = await CadastraMovimentacao(movimentacao);

            if(movimentacaoCadastrada){
                return true
            }else{
                return false
            }

        }else{

        }
                
            return {isSucesso: true, message: 'Investimento inserido com sucesso!'}    
        
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Erro ', error};

    }finally{
        con?.end();
    }
}


export default CadastrarInvestimentos;    