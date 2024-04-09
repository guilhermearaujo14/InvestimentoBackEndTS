import { Request, Response } from 'express';
import CadastrarInvestimentosService from '../../../services/investimentosServices/CadastrarInvestimento';
import investimentoMovimentacaoInterface from '../../../interface/InvestimentoMovimentacao';

async function CadastrarInvestimentos(req: Request, res: Response){
    const { USUARIO_ID } = req.params;
    const { PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA } = req.body;
    
    try {
        const investimentoMovimentacao: investimentoMovimentacaoInterface = { 
                            USUARIO_ID: parseInt(USUARIO_ID),
                            TIPO_ATIVO_ID: 0,
                            PAPEL: PAPEL,
                            SETOR: SETOR,
                            QUANTIDADE_MOVIMENTACAO: parseInt(QUANTIDADE_MOVIMENTACAO),
                            PRECO: PRECO,
                            DATA_COMPRA: DATA_COMPRA,
                            isCOMPRA: isCOMPRA,
                            isVENDA: isVENDA};

        const response: any = await CadastrarInvestimentosService(investimentoMovimentacao);

        return res.status(201).json(response);

    } catch (error) {
        console.log(error)
    }

}

export default CadastrarInvestimentos;

    

//USUARIO_ID, TIPO_ATIVO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA