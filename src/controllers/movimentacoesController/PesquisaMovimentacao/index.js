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
const PesquisaMovimentacao_1 = __importDefault(require("../../../services/movimentacoesServices/PesquisaMovimentacao"));
function PesquisaMovimentacao(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { USUARIO_ID } = req.params;
        const { dataInicio, dataFinal, papel, tipo_ativo_id } = req.query;
        try {
            const response = yield (0, PesquisaMovimentacao_1.default)(parseInt(USUARIO_ID), dataInicio === null || dataInicio === void 0 ? void 0 : dataInicio.toString(), dataFinal === null || dataFinal === void 0 ? void 0 : dataFinal.toString(), papel === null || papel === void 0 ? void 0 : papel.toString(), tipo_ativo_id === null || tipo_ativo_id === void 0 ? void 0 : tipo_ativo_id.toString());
            return res.status(200).send(response);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    });
}
exports.default = PesquisaMovimentacao;
