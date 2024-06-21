"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PesquisaUsuario_1 = __importDefault(require("../../../services/usuarioServices/PesquisaUsuario"));
function ValidaCamposCadastroUsuario(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA } = req.body;
        const usuario = yield (0, PesquisaUsuario_1.default)(0, CPF);
        //console.log(usuario)
        if (usuario) {
            console.log('Caiu aqui... ', usuario);
            return res.status(400).send({ isSucesso: false, message: 'Ops... Usuário já cadastrado na base de dados, faça login.' });
        }
        else if (!NOME && !CPF && !EMAIL && !SENHA) {
            return res.status(400).send({ isSucesso: false, message: 'Ops... Verifique se os campos Nome, CPF, Email e senhas estão preenchidos.' });
        }
        else if (NOME.length < 3) {
            return res.status(400).send({ isSucesso: false, message: 'Ops... Campo nome deve ter pelo menos 3 caracteres.' });
        }
        else if (CPF.length != 11) {
            return res.status(400).send({ isSucesso: false, message: 'Ops... Campo CPF deve ter 11 caracteres.' });
        }
        else {
            console.log('Caiu aqui... ');
            next();
        }
    });
}
exports.default = ValidaCamposCadastroUsuario;
