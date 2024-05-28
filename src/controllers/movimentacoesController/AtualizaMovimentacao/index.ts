import { Request, Response } from 'express';
import AtualizaMovimentacaoService from '../../../services/movimentacoesServices/AtualizaMovimentacao/index';

async function AtualizaMovimentacao(req: Request, res: Response){
    const { USUARIO_ID } = req.params;
    const { MOVIMENTACAO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA } = req.body;
    try {
        const result = await AtualizaMovimentacaoService(parseInt(USUARIO_ID), MOVIMENTACAO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA)
        return res.status(201).send(result);
    } catch (error) {
         
    }
}

export default AtualizaMovimentacao