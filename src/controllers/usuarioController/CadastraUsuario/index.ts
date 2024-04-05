import { Request, Response } from "express";
import CadastraUsuarioServices from "../../../services/usuarioServices/CadastraUsuario";
import Usuario from "../../../models/usuarioModel";
import PesquisaUsuario from "../../../services/usuarioServices/PesquisaUsuario";

async function CadastraUsuario(req: Request, res: Response){
    const {NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA} = req.body;
    try {
        const UsuarioResult = await PesquisaUsuario(0, CPF);
        if(UsuarioResult){
            return res.status(400).send({isSucesso: false, message: 'Ops... Já existe um usuario com esse CPF cadastrado!'});
        }

        const usuario: Usuario = new Usuario(0,NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, new Date());
        const result = await CadastraUsuarioServices(usuario);

        return res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

export default CadastraUsuario;