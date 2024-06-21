import db from '../../../database';
import Usuario from '../../../models/usuarioModel';

async function PesquisaUsuario(ID?: number, CPF?: string){
    const con = await db();
    try {
        const sql = await Usuario.PesquisaUsuario(0, CPF);
        const result: any = await con?.execute(sql);
        const usuario: Usuario = result[0][0];
        return usuario;

    } catch (error) {
        console.log('[DRROR] - PesquisaUsuario: ',error);
        return {isSucesso: false, message: 'Ops.. Não foi possivel encontrar usuario com os dados fornecidos.'};    
    }finally{
        con?.end();
    }
}

export default PesquisaUsuario;