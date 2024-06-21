"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PesquisaMovimentacao_1 = __importDefault(require("../../../services/movimentacoesServices/PesquisaMovimentacao"));
async function PesquisaMovimentacao(req, res) {
    const { USUARIO_ID } = req.params;
    const { dataInicio, dataFinal, papel, tipo_ativo_id, movivimentacaoId } = req.query;
    console.log(USUARIO_ID);
    try {
        const response = await (0, PesquisaMovimentacao_1.default)(parseInt(USUARIO_ID), dataInicio?.toString(), dataFinal?.toString(), papel?.toString(), tipo_ativo_id?.toString(), movivimentacaoId?.toString());
        return res.status(200).send(response);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
exports.default = PesquisaMovimentacao;
