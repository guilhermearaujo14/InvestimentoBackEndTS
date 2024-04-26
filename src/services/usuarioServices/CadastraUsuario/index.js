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
const database_1 = __importDefault(require("../../../database"));
const usuarioModel_1 = __importDefault(require("../../../models/usuarioModel"));
const CriptografaSenha_1 = __importDefault(require("../../../utils/CriptografaSenha"));
function CadastraUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        try {
            const SenhaCriptografada = yield (0, CriptografaSenha_1.default)(usuario.SENHA);
            if (SenhaCriptografada.senhaCriptografada != usuario.SENHA) {
                usuario.SENHA = SenhaCriptografada.senhaCriptografada;
            }
            const sqlCriaUsuario = yield usuarioModel_1.default.CadastraUsuario(usuario.NOME, usuario.CPF, usuario.DATA_NASCIMENTO, usuario.TELEFONE, usuario.EMAIL, usuario.SENHA);
            console.log(sqlCriaUsuario);
            //const result = await con?.execute(sqlCriaUsuario);
            return { isSucesso: true, message: 'Usuario Cadastrado com sucesso' };
        }
        catch (error) {
            console.log('[ERROR] - CadastraUsuario: ', error);
            return { isSucesso: false, message: 'Ops... Não foi possível terminar o processamento.' };
        }
        finally {
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
exports.default = CadastraUsuario;
