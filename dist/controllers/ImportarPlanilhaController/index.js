"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImportarPlanilhaServices_1 = __importDefault(require("../../services/ImportarPlanilhaServices"));
async function ImportarPlanilha(req, res) {
    const { USUARIO_ID } = req.params;
    const dados = req.body.dados;
    try {
        let dadosPlanilhaImport = dados;
        const response = await (0, ImportarPlanilhaServices_1.default)(parseInt(USUARIO_ID), dadosPlanilhaImport);
        return res.status(201).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.default = ImportarPlanilha;
