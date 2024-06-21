"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const totalizadoresServices_1 = __importDefault(require("../../services/totalizadoresServices"));
async function ExibeTotalizadores(req, res) {
    const { USUARIO_ID } = req.params;
    try {
        const response = await (0, totalizadoresServices_1.default)(parseInt(USUARIO_ID));
        res.status(200).send(response);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
exports.default = ExibeTotalizadores;
