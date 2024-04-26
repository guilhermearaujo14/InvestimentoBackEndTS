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
const CadastrarInvestimento_1 = __importDefault(require("../../../services/investimentosServices/CadastrarInvestimento"));
function CadastrarInvestimentos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield (0, CadastrarInvestimento_1.default)(investimentoMovimentacao);
            return res.status(201).json(response);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = CadastrarInvestimentos;
//USUARIO_ID, TIPO_ATIVO_ID, PAPEL, SETOR, QUANTIDADE_MOVIMENTACAO, PRECO, DATA_COMPRA, isCOMPRA, isVENDA
