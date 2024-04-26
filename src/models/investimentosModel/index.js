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
Object.defineProperty(exports, "__esModule", { value: true });
class Investimentos {
    constructor(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, PRECO_MEDIO, TOTAL_INVESTIDO) {
        this.ID = ID;
        this.USUARIO_ID = USUARIO_ID;
        this.TIPO_ATIVO_ID = TIPO_ATIVO_ID;
        this.PAPEL = PAPEL;
        this.NOME_EMPRESA = NOME_EMPRESA;
        this.SETOR = SETOR;
        this.QUANTIDADE = QUANTIDADE;
        this.PRECO_MEDIO = PRECO_MEDIO;
        this.TOTAL_INVESTIDO = TOTAL_INVESTIDO;
    }
    static CriaInvestimento(USUARIO_ID, TIPO_ATIVO_ID, PAPEL, QUANTIDADE, PRECO_MEDIO, TOTAL_INVESTIDO) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO INVESTIMENTOS (USUARIO_ID, TIPO_ATIVO_ID, PAPEL, QUANTIDADE, PRECO_MEDIO, TOTAL_INVESTIDO)
        VALUES (${USUARIO_ID},${TIPO_ATIVO_ID},'${PAPEL}',${QUANTIDADE},${PRECO_MEDIO},${TOTAL_INVESTIDO})`;
            return sql;
        });
    }
    static GetInvestimentos(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL) {
        return __awaiter(this, void 0, void 0, function* () {
            let FiltroID = '';
            ID == 0 ? FiltroID = "1=1" : FiltroID = "ID = " + ID;
            let FiltroTipoAtivo = '';
            TIPO_ATIVO_ID == 0 || TIPO_ATIVO_ID == undefined ? FiltroTipoAtivo = "1=1" : FiltroTipoAtivo = "TIPO_ATIVO_ID = " + TIPO_ATIVO_ID;
            let FiltroPapel = '';
            PAPEL == '' || PAPEL == undefined ? FiltroPapel = "1=1" : FiltroPapel = "PAPEL = '" + PAPEL + "'";
            const sql = `
            SELECT * FROM INVESTIMENTOS 
            WHERE  
                ${FiltroID} 
                AND ((USUARIO_ID = ${USUARIO_ID}) OR (${USUARIO_ID} IS NULL) OR (${USUARIO_ID} = '') OR (${USUARIO_ID} = 0))
                AND ${FiltroTipoAtivo}
                AND ${FiltroPapel}`;
            return sql;
        });
    }
    static AtualizaInvestimentos(ID, QUANTIDADE, PRECO_MEDIO, TOTAL_INVESTIDO) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE INVESTIMENTOS SET QUANTIDADE = ${QUANTIDADE}, PRECO_MEDIO = ${PRECO_MEDIO}, TOTAL_INVESTIDO = ${TOTAL_INVESTIDO} WHERE ID = ${ID}`;
            return sql;
        });
    }
}
exports.default = Investimentos;
