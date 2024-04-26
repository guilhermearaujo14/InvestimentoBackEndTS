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
const ExcluiMovimentacao_1 = __importDefault(require("../../../services/movimentacoesServices/ExcluiMovimentacao"));
function ExcluirMovimentacao(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { USUARIO_ID, MOVIMENTACAO_ID } = req.params;
        try {
            const response = yield (0, ExcluiMovimentacao_1.default)(parseInt(USUARIO_ID), parseInt(MOVIMENTACAO_ID));
            return res.status(200).send(response);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    });
}
exports.default = ExcluirMovimentacao;
