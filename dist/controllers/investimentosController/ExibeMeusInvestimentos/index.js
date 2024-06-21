"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../services/investimentosServices/ExibeMeusInvestimentos/index"));
async function ExibeMeusInvestimentos(req, res) {
    const { USUARIO_ID } = req.params;
    try {
        const response = await (0, index_1.default)(parseInt(USUARIO_ID));
        return res.status(200).send(response);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}
exports.default = ExibeMeusInvestimentos;
