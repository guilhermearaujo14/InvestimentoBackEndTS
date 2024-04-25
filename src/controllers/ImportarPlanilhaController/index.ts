import { Request, Response } from "express";
import ImportarPlanilhaServices from "../../services/ImportarPlanilhaServices";
import PlanilhaImportacao from '../../interface/planilhaImportacao/index';


async function ImportarPlanilha(req: Request, res: Response){
    const { USUARIO_ID } = req.params;
    const dados: [] = req.body.dados;
        
    try {
        let dadosPlanilhaImport: PlanilhaImportacao[] = dados;

        const response = await ImportarPlanilhaServices(parseInt(USUARIO_ID), dadosPlanilhaImport)
        return res.status(201).send(response);

    } catch (error) {
        res.status(400).send(error)
    }
}

export default ImportarPlanilha;