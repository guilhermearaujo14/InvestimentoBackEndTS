
import { Request, Response } from "express";

async function Teste(req: Request, res: Response) {
    try {
        return res.status(200).send('Ok')
    } catch (error) {
        return res.status(400).send(error)
    }
}
export default Teste;