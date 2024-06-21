"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function LerGoogleSheet() {
    const baseURL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.spreadsheets}/values/A1%3AD1850?majorDimension=DIMENSION_UNSPECIFIED&valueRenderOption=UNFORMATTED_VALUE&key=${process.env.API_KEY}`;
    try {
        const response = await axios_1.default.get(baseURL);
        const lista = ConverterJson(response.data.values);
        return lista;
    }
    catch (error) {
        console.log('[ERROR] - LerGoogleSheet: ', error);
        throw error;
    }
}
function ConverterJson(dados) {
    const [chave1, chave2, chave3, chave4] = dados.shift();
    const lista = dados.map((item) => ({
        [chave1]: item[0],
        [chave2]: item[1],
        [chave3]: item[2],
        [chave4]: item[3]
    }));
    return lista;
}
exports.default = LerGoogleSheet;
