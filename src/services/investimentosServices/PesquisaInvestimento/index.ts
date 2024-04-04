import { json } from 'stream/consumers';
import db from '../../../database';
import InvestimentosModel from '../../../models/investimentosModel';

async function Pesquisainvestimento(ID?: number, USUARIO_ID?: number, TIPO_ATIVO_ID?: number, PAPEL?: string){
    const con = await db();
    try {
        const sql = await InvestimentosModel.GetInvestimentos(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
        const result = await con?.execute(sql);
        return result
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Ops... Ocorreu um erro ao realizar operacao de pesquisar investimento => '+ error}
    }finally{
        con?.end() 
    }

}


export default Pesquisainvestimento