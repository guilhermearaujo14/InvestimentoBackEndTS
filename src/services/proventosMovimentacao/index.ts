import db from '../../database'
import { ProventosMovimentacaoInterface } from '../../interface/proventosMovimentacao/index';
import Proventos from '../../models/proventos';
import ProventosMovimentacao from '../../models/proventosMovimentacao'; 

class ProventosMovimentacaoService {

    public static async CreateProventoMovimentacao(ProventosMovimentacaoInterface: ProventosMovimentacaoInterface) {
        const con = await db();
        try {
            let ProventoId
            let newProventoMovimentacao: ProventosMovimentacao
            let sqlPesquisaPapel = await Proventos.GetProventoByPapel(ProventosMovimentacaoInterface.USUARIO_ID, ProventosMovimentacaoInterface.PAPEL);
            let resultQuery: any = await con?.execute(sqlPesquisaPapel)
            
            if (resultQuery[0].length == 0) {
                // cria um registro na tabela PROVENTO para o usuario logado

                const sqlCriaProvento = await Proventos.CadastraProvento(ProventosMovimentacaoInterface.USUARIO_ID, ProventosMovimentacaoInterface.PAPEL);
                await con?.execute(sqlCriaProvento)
                console.log(sqlCriaProvento)

                sqlPesquisaPapel = await Proventos.GetProventoByPapel(ProventosMovimentacaoInterface.USUARIO_ID, ProventosMovimentacaoInterface.PAPEL);
                resultQuery = await con?.execute(sqlPesquisaPapel)
                ProventoId = resultQuery[0][0].ID

        }else{
            //Caso já exista o o papel cadastrado captura somente o id para criar uma movimentação
            ProventoId = resultQuery[0][0].ID
        }

        newProventoMovimentacao = new ProventosMovimentacao(0, ProventoId, ProventosMovimentacaoInterface.VALOR, ProventosMovimentacaoInterface.DATA_PAGAMENTO, new Date());
        const sqlProventoMovimentacao = await ProventosMovimentacao.Create(newProventoMovimentacao.PROVENTOS_ID, newProventoMovimentacao.VALOR, newProventoMovimentacao.DATA_PAGAMENTO);
        await con?.execute(sqlProventoMovimentacao);

        return { message: `${ProventosMovimentacaoInterface.PAPEL} cadastrado com sucesso` }
        } catch (error) {
            console.error(error)
            return error
        }
    }





}

export default ProventosMovimentacaoService