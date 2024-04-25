
import { Request, Response } from "express";
import PesquisainvestimentoService from "../../../services/investimentosServices/PesquisaInvestimento";
async function PesquisaInvestimento(req: Request, res: Response){
    const { USUARIO_ID } = req.params;
    const { PAPEL }: any = req.query;
    try {
        const response = await PesquisainvestimentoService(0, parseInt(USUARIO_ID),0, PAPEL.toUpperCase())
        return res.status(200).send(response.response);
    } catch (error) {
        return res.status(400).send(error);
    }
}

export default PesquisaInvestimento;