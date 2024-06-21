"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FiltraAtivoByPapel(lista, papel) {
    try {
        const ativo = lista.filter(item => item.papel === papel);
        if (ativo.length > 0) {
            return { isSucesso: true, ativo: ativo[0] };
        }
        else {
            return { isSucesso: false };
        }
    }
    catch (error) {
        console.log('[ERROR] - FiltraAtivoByPapel: ', error);
        return { isSucesso: false };
    }
}
exports.default = FiltraAtivoByPapel;
