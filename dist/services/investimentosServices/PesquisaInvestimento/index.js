"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const investimentosModel_1 = __importDefault(require("../../../models/investimentosModel"));
async function Pesquisainvestimento(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL) {
    const con = await (0, database_1.default)();
    try {
        const sql = await investimentosModel_1.default.GetInvestimentos(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
        const result = await con?.execute(sql);
        const response = result?.[0];
        if (response.length == 0) {
            return { isSucesso: false, message: 'Ops... Ativo não encontrado, verifique!' };
        }
        //const listaGoogle = await LerGoogleSheet();
        // const ativo: any = FiltraAtivoByPapel(listaGoogle, response[0].PAPEL)
        // response[0].COTACAO = ativo.ativo.cotacao
        return { isSucesso: true, response };
    }
    catch (error) {
        console.log(error);
        return { isSucesso: false, message: 'Ops... Ocorreu um erro ao realizar operacao de pesquisar investimento => ' + error };
    }
    finally {
        await con?.end();
    }
}
exports.default = Pesquisainvestimento;
