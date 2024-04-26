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
const CadastraUsuario_1 = __importDefault(require("../../../services/usuarioServices/CadastraUsuario"));
const usuarioModel_1 = __importDefault(require("../../../models/usuarioModel"));
const PesquisaUsuario_1 = __importDefault(require("../../../services/usuarioServices/PesquisaUsuario"));
function CadastraUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA } = req.body;
        try {
            const UsuarioResult = yield (0, PesquisaUsuario_1.default)(0, CPF);
            if (UsuarioResult) {
                return res.status(400).send({ isSucesso: false, message: 'Ops... Já existe um usuario com esse CPF cadastrado!' });
            }
            const usuario = new usuarioModel_1.default(0, NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, new Date());
            const result = yield (0, CadastraUsuario_1.default)(usuario);
            return res.status(201).send(result);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
exports.default = CadastraUsuario;
