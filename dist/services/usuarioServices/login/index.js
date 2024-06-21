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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const usuarioModel_1 = __importDefault(require("../../../models/usuarioModel"));
const bcrypt = __importStar(require("bcrypt"));
async function Login(CPF, SENHA) {
    const con = await (0, database_1.default)();
    try {
        const dadosValidos = ValidaInformacoes(CPF, SENHA);
        if (!dadosValidos.isSucesso) {
            return dadosValidos;
        }
        const sql = await usuarioModel_1.default.PesquisaUsuario(0, CPF);
        const result = await con?.execute(sql);
        const usuario = result[0][0];
        if (!usuario) {
            return { isSucesso: false, message: 'Ops... Usuário não encontrado, verifique o CPF e senha informados!' };
        }
        const isSenhasIguais = await ComparaSenhas(SENHA, usuario.SENHA);
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
        await con?.end();
    }
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
async function ComparaSenhas(SENHA, senhaCriptografada) {
    try {
        const isSenhasIguais = await bcrypt.compare(SENHA, senhaCriptografada);
        return isSenhasIguais;
    }
    catch (error) {
        console.log('[ERROR] - ComparaSenhas: ', error);
        throw error;
    }
}
exports.default = Login;
