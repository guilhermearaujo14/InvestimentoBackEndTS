import { json } from 'stream/consumers';
import db from '../../../database';
import InvestimentosModel from '../../../models/investimentosModel';
import LerGoogleSheet from '../../../api/google';
import FiltraAtivoByPapel from '../../../utils/FiltraAtivoByPapel';
import CadastraMovimentacao from '../../movimentacoesServices/CadastraMovimentacao/index';

async function Pesquisainvestimento(ID?: number, USUARIO_ID?: number, TIPO_ATIVO_ID?: number, PAPEL?: string){
    const con = await db();
    try {

        const sql = await InvestimentosModel.GetInvestimentos(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
        const result = await con?.execute(sql);
        const response:any = result?.[0]
        if(response.length == 0){
            return {isSucesso: false, message: 'Ops... Ativo não encontrado, verifique!'} 
        }
        //const listaGoogle = await LerGoogleSheet();
        // const ativo: any = FiltraAtivoByPapel(listaGoogle, response[0].PAPEL)
        // response[0].COTACAO = ativo.ativo.cotacao
        return {isSucesso: true, response}
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Ops... Ocorreu um erro ao realizar operacao de pesquisar investimento => '+ error}
    }finally{
        await con?.end() 
    }

}


export default Pesquisainvestimento