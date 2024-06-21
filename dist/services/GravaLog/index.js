"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
async function GravaLog(mensagem) {
    try {
        const diretorio = 'log';
        const arquivo = 'log.txt';
        const caminhoArquivo = node_path_1.default.join(__dirname, arquivo);
        const dateTime = new Date().toLocaleDateString();
        const log = `${dateTime} - ${mensagem};\n`;
        await promises_1.default.appendFile(caminhoArquivo, log);
    }
    catch (error) {
    }
}
exports.default = GravaLog;
