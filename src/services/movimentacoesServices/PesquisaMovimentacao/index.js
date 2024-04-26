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
const movimentacaoModel_1 = __importDefault(require("../../../models/movimentacaoModel"));
function PesquisaMovimentacoes(USUARIO_ID, dataInicio, dataFinal, PAPEL, TIPO_ATIVO_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        try {
            const sql = yield movimentacaoModel_1.default.PesquisaMovimentacao(USUARIO_ID, dataInicio, dataFinal, PAPEL, TIPO_ATIVO_ID);
            const response = yield (con === null || con === void 0 ? void 0 : con.execute(sql));
            return response[0];
        }
        catch (error) {
            console.log('[ERROR] - PesquisaMovimentacao: ', error);
            return { isSucesso: false, message: 'Ops.. Não foi possivel trazer os dados desejados.' };
        }
    });
}
exports.default = PesquisaMovimentacoes;
