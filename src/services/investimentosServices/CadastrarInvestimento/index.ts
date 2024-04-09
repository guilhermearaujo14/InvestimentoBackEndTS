import { QueryResult } from 'mysql2';
import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import Pesquisainvestimento from '../PesquisaInvestimento';
import investimentoMovimentacaoInterface from '../../../interface/InvestimentoMovimentacao/index';
import CadastraMovimentacao from '../../movimentacoesServices/CadastraMovimentacao';
import Movimentacoes from '../../../models/movimentacaoModel/index';
import LerGoogleSheet from '../../../api/google';
import FiltraAtivoByPapel, { listaInterface } from '../../../utils/FiltraAtivoByPapel';

async function CadastrarInvestimentos(investimentoMovimentacao: investimentoMovimentacaoInterface){
    const con = await db(); 
    let result: any;
    let id_investimento: number;
    let isUpdateInvestimento: boolean;
    let total: number;
    try {
        const listaGoogle: any = await LerGoogleSheet();
        const ativo = FiltraAtivoByPapel(listaGoogle, investimentoMovimentacao.PAPEL);

        if(!ativo){
            return {isSucesso: false, message: 'Ops... Parece que o código digitado não esta correto, verifique!'}
        }
        
        const pesquisaAtivo: any = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL);
        total = investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO * investimentoMovimentacao.PRECO;
        investimentoMovimentacao.TIPO_ATIVO_ID = ativo[0].tipo
        
        if(pesquisaAtivo[0].length == 0 || pesquisaAtivo[0] === undefined){
            isUpdateInvestimento = false;

            const sql = await Investimentos.CriaInvestimento(investimentoMovimentacao.USUARIO_ID,
                                                             investimentoMovimentacao.TIPO_ATIVO_ID,
                                                             investimentoMovimentacao.PAPEL.toUpperCase(),
                                                             investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO,
                                                             investimentoMovimentacao.PRECO, total);
            result = await con?.execute(sql);
            
            const AtivoCadastrado: any = await Pesquisainvestimento(0, investimentoMovimentacao.USUARIO_ID, 0, investimentoMovimentacao.PAPEL);
            id_investimento = AtivoCadastrado[0][0].ID; // aqui preencho o ID do ativo que acabei de cadastrar em investimentos

        }else{
            id_investimento = pesquisaAtivo[0][0].ID; // aqui pego o ID do ativo encontrado na pesquisa.
            isUpdateInvestimento = true;
        }

        const movimentacao =  new Movimentacoes(0, id_investimento, investimentoMovimentacao.QUANTIDADE_MOVIMENTACAO,
                                                investimentoMovimentacao.PRECO,
                                                total,
                                                investimentoMovimentacao.DATA_COMPRA,
                                                investimentoMovimentacao.isCOMPRA,
                                                investimentoMovimentacao.isVENDA, new Date());   
        const movimentacaoCadastrada = await CadastraMovimentacao(movimentacao, isUpdateInvestimento);

        return movimentacaoCadastrada    
        
    } catch (error) {
        console.log('[ERROR] - CadastrarInvestimentos: ',error)
        return {isSucesso: false, message: 'Erro ', error};

    }finally{
       await con?.end();
    }
}


export default CadastrarInvestimentos;    