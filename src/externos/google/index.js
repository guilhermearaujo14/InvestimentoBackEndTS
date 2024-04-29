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
const axios_1 = __importDefault(require("axios"));
function LerGoogleSheet() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseURL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.spreadsheets}/values/A1%3AD1850?majorDimension=DIMENSION_UNSPECIFIED&valueRenderOption=UNFORMATTED_VALUE&key=${process.env.API_KEY}`;
        try {
            const response = yield axios_1.default.get(baseURL);
            const lista = ConverterJson(response.data.values);
            return lista;
        }
        catch (error) {
            console.log('[ERROR] - LerGoogleSheet: ', error);
            throw error;
        }
    });
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
