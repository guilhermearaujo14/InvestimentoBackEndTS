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
const google_1 = __importDefault(require("../../externos/google"));
const database_1 = __importDefault(require("../../database"));
const FiltraAtivoByPapel_1 = __importDefault(require("../../utils/FiltraAtivoByPapel"));
const GravaLog_1 = __importDefault(require("../GravaLog"));
function ExibeTotalizadores(USUARIO_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield (0, database_1.default)();
        const sql = `
        SELECT  INVESTIMENTOS.PAPEL, INVESTIMENTOS.TIPO_ATIVO_ID, TIPO_ATIVO.DESCRICAO, INVESTIMENTOS.QUANTIDADE, 0 AS TOTAL  
        FROM INVESTIMENTOS
        JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
        WHERE USUARIO_ID = ?`;
        try {
            let listaInvestimentos = yield (con === null || con === void 0 ? void 0 : con.execute(sql, [USUARIO_ID]));
            const listaGoogle = yield (0, google_1.default)();
            let data = listaInvestimentos[0].map((item) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                let ativo = yield (0, FiltraAtivoByPapel_1.default)(listaGoogle, item.PAPEL);
                let cotacao = (_a = ativo.ativo) === null || _a === void 0 ? void 0 : _a.cotacao;
                item.TOTAL = item.QUANTIDADE * cotacao;
                return item;
            }));
            return Promise.all(data)
                .then(response => {
                let totais = [{
                        TOTAL_GERAL: SomaTotal(response),
                        TOTAL_ACOES: FiltraTipoAtivoSomaTotal(response, 1),
                        TOTAL_FIIS: FiltraTipoAtivoSomaTotal(response, 2),
                        TOTAL_FI_AGRO: FiltraTipoAtivoSomaTotal(response, 5),
                        TOTAL_ETFS: FiltraTipoAtivoSomaTotal(response, 3),
                        TOTAL_BDRS: FiltraTipoAtivoSomaTotal(response, 4),
                    }];
                return totais;
            });
        }
        catch (error) {
            console.log('[ERROR] - ExibeTotalizadores: ', error);
            yield (0, GravaLog_1.default)(`ExibeTotalizadores - ${error}`);
            throw { isSucesso: false, message: 'Ops.. não foi possível trazer dados dos totalizadores!' };
        }
        finally {
        }
    });
}
function FiltraTipoAtivoSomaTotal(lista, TIPO_ATIVO_ID) {
    if (!lista || !TIPO_ATIVO_ID) {
        console.log('[ERROR] - FiltraTipoAtivo: Não passado lista ou Tipo de ativo para filtrar');
        return 0;
    }
    let listaFiltrada = lista.filter(item => item.TIPO_ATIVO_ID == TIPO_ATIVO_ID);
    if (listaFiltrada.length > 0) {
        let total = listaFiltrada.reduce((total, item) => total + item.TOTAL, 0);
        return total;
    }
    else {
        return 0;
    }
}
function SomaTotal(lista) {
    if (!lista) {
        console.log('[ERROR] - FiltraTipoAtivo: Não encontrei uma lista para somar!');
        return 0;
    }
    if (lista.length > 0) {
        let total = lista.reduce((total, item) => total + item.TOTAL, 0);
        return total;
    }
    else {
        return 0;
    }
}
exports.default = ExibeTotalizadores;
