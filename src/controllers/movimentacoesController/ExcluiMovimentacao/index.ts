import { Request, Response } from "express";
import ExcluirMovimentacaoService from "../../../services/movimentacoesServices/ExcluiMovimentacao";

async function ExcluirMovimentacao(req: Request, res: Response){
    const { USUARIO_ID, MOVIMENTACAO_ID } = req.params;
    try {
        const response = await ExcluirMovimentacaoService(parseInt(USUARIO_ID), parseInt(MOVIMENTACAO_ID));
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default ExcluirMovimentacao;