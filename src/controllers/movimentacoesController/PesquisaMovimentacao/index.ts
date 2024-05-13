import { Request, Response } from "express";
import PesquisaMovimentacoesServices from "../../../services/movimentacoesServices/PesquisaMovimentacao";

async function PesquisaMovimentacao(req: Request, res: Response){
    const { USUARIO_ID } =  req.params;
    const { dataInicio , dataFinal, papel, tipo_ativo_id, movivimentacaoId} = req.query;
    console.log(USUARIO_ID)

    try {
        const response = await PesquisaMovimentacoesServices(parseInt(USUARIO_ID), dataInicio?.toString(), dataFinal?.toString(), papel?.toString(), tipo_ativo_id?.toString(), movivimentacaoId?.toString());
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error);
    }
}

export default PesquisaMovimentacao;