"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FormataData(data) {
    const dataFormatada = data.toLocaleDateString('pt-BR');
    return dataFormatada;
}
exports.default = FormataData;
