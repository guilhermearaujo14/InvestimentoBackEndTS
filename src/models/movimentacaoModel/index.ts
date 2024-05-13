import PesquisaMovimentacao from '../../controllers/movimentacoesController/PesquisaMovimentacao/index';
class Movimentacoes{
    ID?: number;
    INVESTIMENTOS_ID: number;
    QUANTIDADE: number;
    PRECO: number;
    TOTAL: number;
    DATA_MOVIMENTACAO: Date;
    isCOMPRA: boolean;
    isVENDA: boolean;
    DATA_INCLUSAO?: Date

    constructor(ID: number, INVESTIMENTOS_ID: number, QUANTIDADE: number, PRECO: number, TOTAL: number, DATA_MOVIMENTACAO: Date, isCOMPRA:boolean, isVENDA: boolean, DATA_INCLUSAO: Date){
        this.ID = ID;
        this.INVESTIMENTOS_ID = INVESTIMENTOS_ID;
        this.QUANTIDADE = QUANTIDADE;
        this.PRECO = PRECO;
        this.TOTAL = TOTAL;
        this.DATA_MOVIMENTACAO = DATA_MOVIMENTACAO;
        this.isCOMPRA = isCOMPRA;
        this.isVENDA = isVENDA;
        this.DATA_INCLUSAO = DATA_INCLUSAO
    }
    
    static async Criamovimentacao(INVESTIMENTOS_ID: number, QUANTIDADE: number, PRECO: number, TOTAL: number, DATA_MOVIMENTACAO: Date, isCOMPRA: boolean, isVENDA: boolean){
        const sql  = `INSERT INTO MOVIMENTACOES (INVESTIMENTOS_ID, QUANTIDADE, PRECO, TOTAL, DATA_MOVIMENTACAO, isCOMPRA, isVENDA, DATA_INCLUSAO)
        VALUES (${INVESTIMENTOS_ID},${QUANTIDADE},${PRECO},${TOTAL},'${DATA_MOVIMENTACAO}',${isCOMPRA},${isVENDA},now())`;
        return sql;
    }

    static async PesquisaMovimentacao(USUARIO_ID: number, dataInicio?: string, dataFinal?: string, PAPEL?: string, TIPO_ATIVO_ID?: string, ID?: string){
        let FiltroDatas = '';
        dataInicio == '' || dataInicio == undefined  || dataFinal == '' || dataFinal == undefined  ? FiltroDatas ="AND 1=1" : FiltroDatas = "AND MOVIMENTACOES.DATA_MOVIMENTACAO BETWEEN '"+ dataInicio +"' AND '" + dataFinal +"'"
        
        let tipoAtivo = '';
        TIPO_ATIVO_ID == '' || TIPO_ATIVO_ID == undefined ? tipoAtivo = "AND 1=1" : tipoAtivo = " AND INVESTIMENTOS.TIPO_ATIVO_ID = " +TIPO_ATIVO_ID
        
        let FiltroPapel = '';
        PAPEL == '' || PAPEL == undefined ? FiltroPapel = "AND 1=1" : FiltroPapel = "AND INVESTIMENTOS.PAPEL LIKE '%" + PAPEL +"%'"

        let FiltraPorID = '';
        ID == '' || ID == undefined ? FiltraPorID = "AND 1=1" : FiltraPorID = "AND MOVIMENTACOES.ID = "+ID

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
    }

    static async PesquisaMovimentacaoPorId(ID: number){
        const sql = `SELECT * FROM MOVIMENTACAO WHERE ID = ${ID}`;
        return sql;
    }

    static async ExcluiMovimentacao(ID: number){
        const sql = `DELETE FROM MOVIMENTACOES WHERE ID = ${ID}`;
        return sql;
    }
}

export default Movimentacoes;