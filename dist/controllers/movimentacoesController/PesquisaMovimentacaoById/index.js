"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PesquisaMovimentacaoById_1 = __importDefault(require("../../../services/movimentacoesServices/PesquisaMovimentacaoById"));
async function PesquisaMovimentacaoById(req, res) {
    const { MOVIMENTACAO_ID } = req.params;
    try {
        const response = await (0, PesquisaMovimentacaoById_1.default)(parseInt(MOVIMENTACAO_ID));
        return res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.default = PesquisaMovimentacaoById;
