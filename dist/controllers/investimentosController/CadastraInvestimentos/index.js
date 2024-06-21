"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CadastrarInvestimento_1 = __importDefault(require("../../../services/investimentosServices/CadastrarInvestimento"));
async function CadastrarInvestimentos(req, res) {
    const { USUARIO_ID } = req.params;
    const { PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA } = req.body;
    try {
        const investimentoMovimentacao = {
            USUARIO_ID: parseInt(USUARIO_ID),
            TIPO_ATIVO_ID: 0,
            PAPEL: PAPEL,
            SETOR: SETOR,
            QUANTIDADE_MOVIMENTACAO: parseInt(QUANTIDADE_MOVIMENTACAO),
            PRECO: PRECO,
            DATA_COMPRA: DATA_COMPRA,
            isCOMPRA: isCOMPRA,
            isVENDA: isVENDA
        };
        const response = await (0, CadastrarInvestimento_1.default)(investimentoMovimentacao);
        return res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = CadastrarInvestimentos;
//USUARIO_ID, TIPO_ATIVO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA
