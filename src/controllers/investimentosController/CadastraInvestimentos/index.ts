import { Request, Response } from 'express';
import CadastrarInvestimentosService from '../../../services/investimentosServices/CadastrarInvestimento';


async function CadastrarInvestimentos(req: Request, res: Response){

    try {
        const response: any = await CadastrarInvestimentosService();

        return res.status(201).json(response);

    } catch (error) {
        
    }

}

export default CadastrarInvestimentos;