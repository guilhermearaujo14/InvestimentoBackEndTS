import { Request, Response } from 'express';
import PesquisaMovimentacaoByIdServices from '../../../services/movimentacoesServices/PesquisaMovimentacaoById';

async function PesquisaMovimentacaoById(req: Request, res: Response){
    const { ID } = req.params;
try {
    console.log('executou')
    const result = await PesquisaMovimentacaoByIdServices(parseInt(ID));
    console.log(result);
    return res.status(200).send(result)
} catch (error) {
    
}
}

export default PesquisaMovimentacaoById; 