"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../services/movimentacoesServices/AtualizaMovimentacao/index"));
async function AtualizaMovimentacao(req, res) {
    const { USUARIO_ID } = req.params;
    const { MOVIMENTACAO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA } = req.body;
    try {
        const result = await (0, index_1.default)(parseInt(USUARIO_ID), MOVIMENTACAO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA);
        return res.status(201).send(result);
    }
    catch (error) {
    }
}
exports.default = AtualizaMovimentacao;
