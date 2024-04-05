import db from '../../../database';
import Usuario from '../../../models/usuarioModel';
import CriptografaSenha from '../../../utils/CriptografaSenha';
import FormataData from '../../../utils/FormataData/index';

async function CadastraUsuario(usuario: Usuario){
    const con = await db();
    try {
        const SenhaCriptografada = await CriptografaSenha(usuario.SENHA);
        if(SenhaCriptografada.senhaCriptografada != usuario.SENHA){
            usuario.SENHA = SenhaCriptografada.senhaCriptografada;
        }

        const sqlCriaUsuario = await Usuario.CadastraUsuario(usuario.NOME, usuario.CPF, usuario.DATA_NASCIMENTO, usuario.TELEFONE, usuario.EMAIL, usuario.SENHA);
        console.log(sqlCriaUsuario);
        //const result = await con?.execute(sqlCriaUsuario);
        return {isSucesso: true, message: 'Usuario Cadastrado com sucesso'};

    } catch (error) {
        console.log('[ERROR] - CadastraUsuario: ', error)
        return {isSucesso: false, message: 'Ops... Não foi possível terminar o processamento.'}
    }finally{
        await con?.end();
    }
}

export default CadastraUsuario;