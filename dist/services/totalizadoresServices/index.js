"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = __importDefault(require("../../externos/google"));
const database_1 = __importDefault(require("../../database"));
const FiltraAtivoByPapel_1 = __importDefault(require("../../utils/FiltraAtivoByPapel"));
const GravaLog_1 = __importDefault(require("../GravaLog"));
async function ExibeTotalizadores(USUARIO_ID) {
    const con = await (0, database_1.default)();
    const sql = `
        SELECT  INVESTIMENTOS.PAPEL, INVESTIMENTOS.TIPO_ATIVO_ID, TIPO_ATIVO.DESCRICAO, INVESTIMENTOS.QUANTIDADE, 0 AS TOTAL  
        FROM INVESTIMENTOS
        JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
        WHERE USUARIO_ID = ?`;
    try {
        let listaInvestimentos = await con?.execute(sql, [USUARIO_ID]);
        const listaGoogle = await (0, google_1.default)();
        let data = listaInvestimentos[0].map(async (item) => {
            let ativo = await (0, FiltraAtivoByPapel_1.default)(listaGoogle, item.PAPEL);
            let cotacao = ativo.ativo?.cotacao;
            item.TOTAL = item.QUANTIDADE * cotacao;
            return item;
        });
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
        await (0, GravaLog_1.default)(`ExibeTotalizadores - ${error}`);
        throw { isSucesso: false, message: 'Ops.. não foi possível trazer dados dos totalizadores!' };
    }
    finally {
    }
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
