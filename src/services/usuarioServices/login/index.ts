import db from '../../../database';
import Usuario from '../../../models/usuarioModel';
import * as bcrypt from 'bcrypt';

async function Login( CPF: string, SENHA: string){
    const con = await db();
try {
    const dadosValidos = ValidaInformacoes(CPF, SENHA);
    if(!dadosValidos.isSucesso){
        return dadosValidos
    }

    const sql = await Usuario.PesquisaUsuario(0, CPF);
    const result: any = await con?.execute(sql);
    const usuario: Usuario = result[0][0];
    if(!usuario){
        return {isSucesso: false, message: 'Ops... Usuário não encontrado, verifique o CPF e senha informados!'}
    }

    const isSenhasIguais = await ComparaSenhas(SENHA, usuario.SENHA);
    if(isSenhasIguais){
        return {isSucesso: true, message: `Bem-vindo ${usuario.NOME}!`}
    }else{

        return {isSucesso: false, message: `Ops... Nâo foi possível fazer login, tente novamente em instantes!`}
    }

} catch (error) {
    console.log('[ERROR] - Login: ', error);
    return {isSucesso: false, message: 'Ops.. não foi possível fazer login!'}
}finally{
    con?.end();
}

}

function ValidaInformacoes(CPF: string, SENHA: string){
    if(!CPF || !SENHA){
        return {isSucesso: false, message: 'Ops... CPF ou senha inválidos, verifique!'}
    }

    if(CPF.length != 11){
        return {isSucesso: false, message: 'Ops... CPF inválido, verifique!'}
    }
    return {isSucesso: true}

}

async function ComparaSenhas(SENHA: string, senhaCriptografada: string){
    try {
        const isSenhasIguais = await bcrypt.compare(SENHA, senhaCriptografada)
        return isSenhasIguais
    } catch (error) {
        console.log('[ERROR] - ComparaSenhas: ', error)
        throw error
    }
}

export default Login;