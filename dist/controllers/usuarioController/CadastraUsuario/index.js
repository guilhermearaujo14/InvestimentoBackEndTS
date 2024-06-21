"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CadastraUsuario_1 = __importDefault(require("../../../services/usuarioServices/CadastraUsuario"));
const usuarioModel_1 = __importDefault(require("../../../models/usuarioModel"));
const PesquisaUsuario_1 = __importDefault(require("../../../services/usuarioServices/PesquisaUsuario"));
async function CadastraUsuario(req, res) {
    const { NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA } = req.body;
    //console.log(req.body)
    try {
        const UsuarioResult = await (0, PesquisaUsuario_1.default)(0, CPF);
        if (UsuarioResult) {
            return res.status(400).send({ isSucesso: false, message: 'Ops... Já existe um usuario com esse CPF cadastrado!' });
        }
        else {
            const usuario = new usuarioModel_1.default(0, NOME.toUpperCase(), CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, new Date());
            const result = await (0, CadastraUsuario_1.default)(usuario);
            return res.status(201).send(result);
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.default = CadastraUsuario;
