"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const usuarioModel_1 = __importDefault(require("../../../models/usuarioModel"));
const CriptografaSenha_1 = __importDefault(require("../../../utils/CriptografaSenha"));
async function CadastraUsuario(usuario) {
    const con = await (0, database_1.default)();
    try {
        const SenhaCriptografada = await (0, CriptografaSenha_1.default)(usuario.SENHA);
        if (SenhaCriptografada.senhaCriptografada != usuario.SENHA) {
            usuario.SENHA = SenhaCriptografada.senhaCriptografada;
        }
        const sqlCriaUsuario = await usuarioModel_1.default.CadastraUsuario(usuario.NOME, usuario.CPF, usuario.DATA_NASCIMENTO, usuario.TELEFONE, usuario.EMAIL, usuario.SENHA);
        console.log(sqlCriaUsuario);
        const result = await con?.execute(sqlCriaUsuario);
        return { isSucesso: true, message: 'Usuario Cadastrado com sucesso' };
    }
    catch (error) {
        console.log('[ERROR] - CadastraUsuario: ', error);
        return { isSucesso: false, message: 'Ops... Não foi possível terminar o processamento.' };
    }
    finally {
        await con?.end();
    }
}
exports.default = CadastraUsuario;
