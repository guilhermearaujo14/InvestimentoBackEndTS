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
const promise_1 = __importDefault(require("mysql2/promise"));
require("dotenv/config");
function conexao() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield promise_1.default.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATA_BASE,
            });
            if (connection) {
                console.log('Conexão com banco de dados realizada');
                return connection;
            }
            else {
                console.log('Não foi possivel conectar com banco de dados.');
            }
        }
        catch (error) {
            console.log('Erro ao conectar Banco');
        }
    });
}
function fecharConexao(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (connection) {
            try {
                yield connection.end();
                console.log('Conexão com banco de dados fechada');
            }
            catch (error) {
                console.error('Erro ao fechar a conexão com o banco de dados:', error);
                throw error; // Lança o erro para ser tratado pelo código que chamou a função
            }
        }
    });
}
exports.default = conexao;
