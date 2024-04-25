import { Request, Response } from "express";
import ListGoogleSheetsServices from "../../services/GoogleSheetsServices";

async function ListGoogleSheets(req: Request, res: Response){

    try {
        const response = await ListGoogleSheetsServices();

        res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error);
    }
}


export default ListGoogleSheets;