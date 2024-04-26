"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FormataMoeda(valor) {
    const valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valorFormatado;
}
exports.default = FormataMoeda;
