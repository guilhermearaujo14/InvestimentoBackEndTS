"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = __importDefault(require("../../externos/google"));
async function ListGoogleSheets() {
    try {
        const lista = await (0, google_1.default)();
        return lista;
    }
    catch (error) {
        console.log('[ERROR] - ListGoogleSheets: ', error);
        return { isSucesso: false, message: 'Ops... Não foi possível buscar dados do google.' };
    }
}
exports.default = ListGoogleSheets;
