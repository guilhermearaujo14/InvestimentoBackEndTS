import db from '../../../database';
import Investimentos from '../../../models/investimentosModel';
import movimentacoesModel from '../../../models/movimentacaoModel';
import AtualizaInvestimento from '../../investimentosServices/AtualizaInvestimento';

async function CadastraMovimentacao(movimentacoes: movimentacoesModel, isUpdateInvestimento: boolean){
    const con = await db();
    let result: any = [];
    let isPodeCadastrarMovimentacao: boolean = true;
    let isPodeAtualizar: boolean = false;
    try {
        const sql_CriaMovimentacao = await movimentacoesModel.Criamovimentacao(movimentacoes.INVESTIMENTOS_ID, movimentacoes.QUANTIDADE, movimentacoes.PRECO, movimentacoes.TOTAL, movimentacoes.DATA_MOVIMENTACAO, movimentacoes.isCOMPRA, movimentacoes.isVENDA)
        const sql_investimento = await Investimentos.GetInvestimentos(movimentacoes.INVESTIMENTOS_ID,0,0,'');
        let resultadoPesquisa = await con?.execute(sql_investimento);
        let j: any = resultadoPesquisa?.[0];
        let investimentoParaAtualizar = [j][0][0];
        
            if(movimentacoes.isCOMPRA){
                // Aqui irei somar os valores
                investimentoParaAtualizar.QUANTIDADE += movimentacoes.QUANTIDADE;
                investimentoParaAtualizar.TOTAL_INVESTIDO += movimentacoes.TOTAL;
                investimentoParaAtualizar.PRECO_MEDIO = investimentoParaAtualizar.TOTAL_INVESTIDO/investimentoParaAtualizar.QUANTIDADE;
                isPodeAtualizar = true;
            }else{
                if(investimentoParaAtualizar.QUANTIDADE >= movimentacoes.QUANTIDADE){
                    isPodeAtualizar = true;
                }else{
                    isPodeAtualizar = false;
                    isPodeCadastrarMovimentacao = false;
                }
                investimentoParaAtualizar.QUANTIDADE -= movimentacoes.QUANTIDADE;
                investimentoParaAtualizar.TOTAL_INVESTIDO -= movimentacoes.TOTAL;
                investimentoParaAtualizar.PRECO_MEDIO = investimentoParaAtualizar.TOTAL_INVESTIDO/investimentoParaAtualizar.QUANTIDADE;
            }

            if(isUpdateInvestimento == true && isPodeAtualizar == true){
                const investimento = new Investimentos(investimentoParaAtualizar.ID,
                                                        investimentoParaAtualizar.USUARIO_ID,
                                                        investimentoParaAtualizar.TIPO_ATIVO_ID,
                                                        investimentoParaAtualizar.PAPEL,
                                                        investimentoParaAtualizar.NOME_EMPRESA,
                                                        investimentoParaAtualizar.SETOR,
                                                        investimentoParaAtualizar.QUANTIDADE,
                                                        investimentoParaAtualizar.PRECO_MEDIO,
                                                        investimentoParaAtualizar.TOTAL_INVESTIDO);
    
                    isPodeCadastrarMovimentacao = await AtualizaInvestimento(investimento);
            }            
        
        if(isPodeCadastrarMovimentacao === true){
            result = await con?.execute(sql_CriaMovimentacao);
            return {isSucesso: true, message: 'Cadastro realizado com sucesso!'}
        }else{
            return {isSucesso: false, message: 'Operação não registrada!'};
        }

    } catch (error) {
        console.log('[ERROR] - CadastraMovimentacao: ', error)
        throw false

    }finally{
        await con?.end()
    }
}

export default CadastraMovimentacao