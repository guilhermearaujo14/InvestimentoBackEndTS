"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FormtaDataSalvar(data) {
    const d = data.split('/');
    const dateFormat = `${d[2]}-${d[1]}-${d[0]}`;
    return dateFormat;
}
exports.default = FormtaDataSalvar;
