import { Request, Response } from 'express';
import PesquisaMovimentacaoByIdServices from '../../../services/movimentacoesServices/PesquisaMovimentacaoById';

async function PesquisaMovimentacaoById(req: Request, res: Response){
    const { MOVIMENTACAO_ID } = req.params;
try {
    console.log('executou')
    //const response = await PesquisaMovimentacaoByIdServices(parseInt(MOVIMENTACAO_ID));
    //console.log(response);
    return res.status(200).send(true)
} catch (error) {
    res.status(400).send(error)
}
}

export default PesquisaMovimentacaoById; 