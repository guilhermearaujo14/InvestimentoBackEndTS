import { Request, Response } from "express";
import LoginServices from "../../../services/usuarioServices/login";

async function Login(req: Request, res: Response){
    const {CPF, SENHA } = req.body;
try {
    const response = await LoginServices(CPF, SENHA);
    
    return res.status(200).send(response);
} catch (error) {
    return res.status(400).send(error);
}
}


export default Login;