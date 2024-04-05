import { NextFunction, Request, Response } from "express";

async function ValidaCamposCadastroUsuario(req: Request, res: Response, next: NextFunction){
    const {NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA} = req.body;

    if(!NOME && !CPF && !EMAIL && !SENHA){
        
        return res.status(400).send({isSucesso: false, message: 'Ops... Verifique se os campos Nome, CPF, Email e senhas estão preenchidos.'});
    }

    if(NOME.length < 3){
        return res.status(400).send({isSucesso: false, message: 'Ops... Campo nome deve ter pelo menos 3 caracteres.'});
    }

    
    if(CPF.length != 11){
        return res.status(400).send({isSucesso: false, message: 'Ops... Campo CPF deve ter 11 caracteres.'});
    }

}


export default ValidaCamposCadastroUsuario;