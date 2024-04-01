import { Request, Response } from 'express';
import ExibeMeusInvestimentosServices from '../../../services/investimentosServices/ExibeMeusInvestimentos/index';


async function ExibeMeusInvestimentos(req: Request, res: Response){
const { USUARIO_ID } = req.params;

try {
    const response = await ExibeMeusInvestimentosServices(parseInt(USUARIO_ID));
    return res.status(200).send(response);
    
} catch (error) {
    return res.status(500).send(error)
}
}

export default ExibeMeusInvestimentos