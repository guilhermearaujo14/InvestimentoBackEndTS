import { Request, Response } from 'express';
import PesquisaMovimentacaoByIdServices from '../../../services/movimentacoesServices/PesquisaMovimentacaoById';

async function PesquisaMovimentacaoById(req: Request, res: Response){
    const { MOVIMENTACAO_ID } = req.params;
try {
    const response = await PesquisaMovimentacaoByIdServices(parseInt(MOVIMENTACAO_ID));
    return res.status(200).send(response)
} catch (error) {
    res.status(400).send(error)
}
}

export default PesquisaMovimentacaoById; 