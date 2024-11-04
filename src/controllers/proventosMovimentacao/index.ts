import { Request, Response } from "express";
import ProventosMovimentacaoService from "../../services/proventosMovimentacao";
import { ProventosMovimentacaoInterface } from '../../interface/proventosMovimentacao/index';

class ProventosMovimentacaoController{
    public static async  CreateProventoMovimentacao(req: Request, res: Response){
        const { USUARIO_ID, PAPEL, VALOR, DATA_PAGAMENTO } = req.body;
        try {
            const ProventosMovimentacaoInterface = { USUARIO_ID, PAPEL, VALOR, DATA_PAGAMENTO }
            const response = await ProventosMovimentacaoService.CreateProventoMovimentacao(ProventosMovimentacaoInterface)
            return res.status(201).send(response)
        } catch (error) {
            console.error(error)
            return res.status(500).send(error)
        }
    }
}

export default ProventosMovimentacaoController