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
const FiltraAtivoByPapel_1 = __importDefault(require("../../../utils/FiltraAtivoByPapel"));
const google_1 = __importDefault(require("../../../externos/google"));
function ExibeMeusInvestimentos(USUARIO_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        const sql = `
    SELECT INVESTIMENTOS.ID, INVESTIMENTOS.PAPEL, INVESTIMENTOS.TIPO_ATIVO_ID , TIPO_ATIVO.DESCRICAO, INVESTIMENTOS.PRECO_MEDIO, INVESTIMENTOS.TOTAL_INVESTIDO,
    INVESTIMENTOS.QUANTIDADE, 0 COTACAO, 0 TOTAL_ATUAL, 0 PERDA_LUCRO
    FROM INVESTIMENTOS
    JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
    WHERE USUARIO_ID = ?
    AND INVESTIMENTOS.QUANTIDADE > 0
    ORDER BY INVESTIMENTOS.TIPO_ATIVO_ID ASC, INVESTIMENTOS.PAPEL`;
        try {
            const result = yield (con === null || con === void 0 ? void 0 : con.execute(sql, [USUARIO_ID]));
            const listaGoogle = yield (0, google_1.default)();
            result[0].map((item) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                let Ativo = (0, FiltraAtivoByPapel_1.default)(listaGoogle, item.PAPEL);
                let cotacao = (_a = Ativo.ativo) === null || _a === void 0 ? void 0 : _a.cotacao;
                item.COTACAO = cotacao;
                item.TOTAL_ATUAL = item.COTACAO * item.QUANTIDADE;
                item.PERDA_LUCRO = item.TOTAL_ATUAL - item.TOTAL_INVESTIDO;
                return;
            }));
            const meusInvestimentos = result;
            return meusInvestimentos[0];
        }
        catch (error) {
            console.log('[ERROR] - ExibeMeusInvestimentos: ', error);
            return { isSucesso: false, message: 'Ops... Não foi possivel trazer os dados do seu investimento!' };
        }
        finally {
            yield (con === null || con === void 0 ? void 0 : con.end());
        }
    });
}
exports.default = ExibeMeusInvestimentos;
