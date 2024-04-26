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
const investimentosModel_1 = __importDefault(require("../../../models/investimentosModel"));
function Pesquisainvestimento(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        try {
            const sql = yield investimentosModel_1.default.GetInvestimentos(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL);
            const result = yield (con === null || con === void 0 ? void 0 : con.execute(sql));
            const response = result === null || result === void 0 ? void 0 : result[0];
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
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
exports.default = Pesquisainvestimento;
