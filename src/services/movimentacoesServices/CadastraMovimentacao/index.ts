import { QueryResult } from 'mysql2';
import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import movimentacoesModel from '../../../models/movimentacaoModel';
import { Console } from 'console';

async function CadastraMovimentacao(movimentacoes: movimentacoesModel, isUpdateInvestimento: boolean){
    const con = await db();
    try {
        const sql = await movimentacoesModel.Criamovimentacao(movimentacoes.INVESTIMENTOS_ID, movimentacoes.QUANTIDADE, movimentacoes.PRECO, movimentacoes.TOTAL, movimentacoes.DATA_MOVIMENTACAO, movimentacoes.isCOMPRA, movimentacoes.isVENDA)
        const result = await con?.execute(sql);

        if(isUpdateInvestimento){
            // Aqui atualizo o a tabela investimentos
            const sql_investimento = await Investimentos.GetInvestimentos(movimentacoes.INVESTIMENTOS_ID,0,0,'');
            let resultadoPesquisa = await con?.execute(sql_investimento);
            let j: any = resultadoPesquisa?.[0];
            let investimentoParaAtualizar = [j][0][0];

            if(movimentacoes.isCOMPRA){
                // Aqui irei somar os valores
                investimentoParaAtualizar.QUANTIDADE += movimentacoes.QUANTIDADE;
                investimentoParaAtualizar.TOTAL_INVESTIDO += movimentacoes.TOTAL;
                investimentoParaAtualizar.PRECO_MEDIO = investimentoParaAtualizar.TOTAL_INVESTIDO/investimentoParaAtualizar.QUANTIDADE;
                
            }else{
                // Aqui irei subtrair os valores
                // Fazer aqui a verificação se a quantidade que ele informou da venda é menor ou igual a quantidade que ele possui disponivel.
            }
            const investimento = new Investimentos(investimentoParaAtualizar.ID,
                investimentoParaAtualizar.USUARIO_ID,
                investimentoParaAtualizar.TIPO_ATIVO_ID,
                investimentoParaAtualizar.PAPEL,
                investimentoParaAtualizar.NOME_EMPRESA,
                investimentoParaAtualizar.SETOR,
                investimentoParaAtualizar.QUANTIDADE,
                investimentoParaAtualizar.PRECO_MEDIO,
                investimentoParaAtualizar.TOTAL_INVESTIDO);

                const sql_UpdateInvestimento = await Investimentos.AtualizaInvestimentos(investimentoParaAtualizar.ID,
                                                                                        investimentoParaAtualizar.QUANTIDADE,
                                                                                        investimentoParaAtualizar.PRECO_MEDIO,
                                                                                        investimentoParaAtualizar.TOTAL_INVESTIDO);
                const res = await con?.execute(sql_UpdateInvestimento);
        }

        return result
    } catch (error) {
        console.log('[ERROR] - CadastraMovimentacao: ', error)
        throw false
    }finally{
        await con?.end()
    }
}

export default CadastraMovimentacao