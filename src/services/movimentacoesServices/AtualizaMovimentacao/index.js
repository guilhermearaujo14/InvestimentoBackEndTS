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
const database_1 = __importDefault(require("../../../database"));
const GravaLog_1 = __importDefault(require("../../GravaLog"));
function AtualizaMovimentacao(movimentacao) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        try {
            /** ENCONTRAR MOVIMENTACAO QUE DEVERÁ SER ATUALIZADA */
            /** ENCONTRAR INVESTIMENTO */
            /** ATUALIZAR INVESTIMENTO */
        }
        catch (error) {
            console.log('[AtualizaMovimentacao] - ', error);
            yield (0, GravaLog_1.default)(`[AtualizaMovimentacao] - ${error}`);
            return { isSucesso: false, message: 'Ops... não foi possivel atualizar movimentação.' };
        }
    });
}
exports.default = AtualizaMovimentacao;
