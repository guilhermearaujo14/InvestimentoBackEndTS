"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PesquisaInvestimento_1 = __importDefault(require("../../../services/investimentosServices/PesquisaInvestimento"));
async function PesquisaInvestimento(req, res) {
    const { USUARIO_ID } = req.params;
    const { PAPEL } = req.query;
    try {
        const response = await (0, PesquisaInvestimento_1.default)(0, parseInt(USUARIO_ID), 0, PAPEL.toUpperCase());
        return res.status(200).send(response.response);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
exports.default = PesquisaInvestimento;
