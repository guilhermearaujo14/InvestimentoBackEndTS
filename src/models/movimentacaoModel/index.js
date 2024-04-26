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
class Movimentacoes {
    constructor(ID, INVESTIMENTOS_ID, QUANTIDADE, PRECO, TOTAL, DATA_MOVIMENTACAO, isCOMPRA, isVENDA, DATA_INCLUSAO) {
        this.ID = ID;
        this.INVESTIMENTOS_ID = INVESTIMENTOS_ID;
        this.QUANTIDADE = QUANTIDADE;
        this.PRECO = PRECO;
        this.TOTAL = TOTAL;
        this.DATA_MOVIMENTACAO = DATA_MOVIMENTACAO;
        this.isCOMPRA = isCOMPRA;
        this.isVENDA = isVENDA;
        this.DATA_INCLUSAO = DATA_INCLUSAO;
    }
    static Criamovimentacao(INVESTIMENTOS_ID, QUANTIDADE, PRECO, TOTAL, DATA_MOVIMENTACAO, isCOMPRA, isVENDA) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO MOVIMENTACOES (INVESTIMENTOS_ID, QUANTIDADE, PRECO, TOTAL, DATA_MOVIMENTACAO, isCOMPRA, isVENDA, DATA_INCLUSAO)
        VALUES (${INVESTIMENTOS_ID},${QUANTIDADE},${PRECO},${TOTAL},'${DATA_MOVIMENTACAO}',${isCOMPRA},${isVENDA},now())`;
            return sql;
        });
    }
    static PesquisaMovimentacao(USUARIO_ID, dataInicio, dataFinal, PAPEL, TIPO_ATIVO_ID, ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let FiltroDatas = '';
            dataInicio == '' || dataInicio == undefined || dataFinal == '' || dataFinal == undefined ? FiltroDatas = "AND 1=1" : FiltroDatas = "AND MOVIMENTACOES.DATA_MOVIMENTACAO BETWEEN '" + dataInicio + "' AND '" + dataFinal + "'";
            let tipoAtivo = '';
            TIPO_ATIVO_ID == '' || TIPO_ATIVO_ID == undefined ? tipoAtivo = "AND 1=1" : tipoAtivo = " AND INVESTIMENTOS.TIPO_ATIVO_ID = " + TIPO_ATIVO_ID;
            let FiltroPapel = '';
            PAPEL == '' || PAPEL == undefined ? FiltroPapel = "AND 1=1" : FiltroPapel = "AND INVESTIMENTOS.PAPEL LIKE '%" + PAPEL + "%'";
            let FiltraPorID = '';
            ID == 0 || ID == undefined ? FiltraPorID = "AND 1=1" : FiltraPorID = "AND MOVIMENTACOES.ID = " + ID;
            const sql = `SELECT MOVIMENTACOES.ID, INVESTIMENTOS.PAPEL,  MOVIMENTACOES.QUANTIDADE, MOVIMENTACOES.PRECO, MOVIMENTACOES.TOTAL, MOVIMENTACOES.DATA_MOVIMENTACAO,
                        CASE WHEN MOVIMENTACOES.ISCOMPRA = 1 THEN 'Compra' ELSE 'Venda' END TIPO 
                        FROM MOVIMENTACOES
                        JOIN INVESTIMENTOS ON (MOVIMENTACOES.INVESTIMENTOS_ID = INVESTIMENTOS.ID)
                        WHERE 
                            INVESTIMENTOS.USUARIO_ID = ${USUARIO_ID} 
                        ${FiltroDatas} 
                        ${FiltroPapel}
                        ${tipoAtivo}
                        ${FiltraPorID}
                        ORDER BY MOVIMENTACOES.DATA_MOVIMENTACAO DESC
                        `;
            return sql;
        });
    }
    static ExcluiMovimentacao(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM MOVIMENTACOES WHERE ID = ${ID}`;
            return sql;
        });
    }
}
exports.default = Movimentacoes;
