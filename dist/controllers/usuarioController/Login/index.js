"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../../../services/usuarioServices/login"));
async function Login(req, res) {
    const { CPF, SENHA } = req.body;
    try {
        const response = await (0, login_1.default)(CPF, SENHA);
        return res.status(200).send(response);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
exports.default = Login;
