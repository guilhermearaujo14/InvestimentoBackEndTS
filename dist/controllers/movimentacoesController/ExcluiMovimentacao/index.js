"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExcluiMovimentacao_1 = __importDefault(require("../../../services/movimentacoesServices/ExcluiMovimentacao"));
async function ExcluirMovimentacao(req, res) {
    const { USUARIO_ID, MOVIMENTACAO_ID } = req.params;
    try {
        const response = await (0, ExcluiMovimentacao_1.default)(parseInt(USUARIO_ID), parseInt(MOVIMENTACAO_ID));
        return res.status(200).send(response);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
exports.default = ExcluirMovimentacao;
