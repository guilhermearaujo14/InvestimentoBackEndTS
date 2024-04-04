import { Request, Response } from "express";
import ExibeTotalizadoresServices from "../../services/totalizadoresServices";

async function ExibeTotalizadores(req: Request, res: Response){
    const { USUARIO_ID } = req.params;
    try {
        const response = await ExibeTotalizadoresServices(parseInt(USUARIO_ID));
        res.status(200).send(response)
    } catch (error) {
        return res.status(400).send(error);
    }
}

export default ExibeTotalizadores;