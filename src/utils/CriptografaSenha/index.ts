import * as bcrypt from 'bcrypt';

async function CriptografaSenha(Senha: string){
    if(Senha == ''){
        return {isSucesso: false, message: 'Ops.. Não foi informado valor no campo senha!', senhaCriptografada:''}
    }

    try {

        const senhaCriptografada = await bcrypt.hash(Senha, 10);
        return {isSucesso: true, message: '', senhaCriptografada: senhaCriptografada};

    } catch (error) {
        console.log('[ERROR] - CriptografaSenha: ', error);
        return {isSucesso: false, message: 'Não foi possível criptografar a senha solicitada!', senhaCriptografada:''}
    }

}

export default CriptografaSenha;