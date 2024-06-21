"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
function Login(CPF, SENHA) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        try {
            const dadosValidos = ValidaInformacoes(CPF, SENHA);
            if (!dadosValidos.isSucesso) {
                return dadosValidos;
            }
            const sql = yield usuarioModel_1.default.PesquisaUsuario(0, CPF);
            const result = yield (con === null || con === void 0 ? void 0 : con.execute(sql));
            const usuario = result[0][0];
            if (!usuario) {
                return { isSucesso: false, message: 'Ops... Usuário não encontrado, verifique o CPF e senha informados!' };
            }
            const isSenhasIguais = yield ComparaSenhas(SENHA, usuario.SENHA);
            if (isSenhasIguais) {
                return { isSucesso: true, message: `Bem-vindo ${usuario.NOME}!`, usuario: usuario.NOME, usuario_id: usuario.ID };
            }
            else {
                return { isSucesso: false, message: `Ops... Nâo foi possível fazer login, verifique se os informados estão corretos!` };
            }
        }
        catch (error) {
            console.log('[ERROR] - Login: ', error);
            return { isSucesso: false, message: 'Ops.. não foi possível fazer login!' };
        }
        finally {
            con === null || con === void 0 ? void 0 : con.end();
        }
    });
}
function ValidaInformacoes(CPF, SENHA) {
    if (!CPF || !SENHA) {
        return { isSucesso: false, message: 'Ops... CPF ou senha inválidos, verifique!' };
    }
    if (CPF.length != 11) {
        return { isSucesso: false, message: 'Ops... CPF inválido, verifique!' };
    }
    return { isSucesso: true };
}
function ComparaSenhas(SENHA, senhaCriptografada) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isSenhasIguais = yield bcrypt.compare(SENHA, senhaCriptografada);
            return isSenhasIguais;
        }
        catch (error) {
            console.log('[ERROR] - ComparaSenhas: ', error);
            throw error;
        }
    });
}
exports.default = Login;
