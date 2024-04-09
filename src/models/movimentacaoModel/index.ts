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

    static async PesquisaMovimentacao(USUARIO_ID: number, dataInicio?: string, dataFinal?: string, PAPEL?: string, TIPO_ATIVO_ID?: string){
        let tipoAtivo = ''
        TIPO_ATIVO_ID == '' ? tipoAtivo = "1=1" : tipoAtivo = " AND INVESTIMENTOS.TIPO_ATIVO_ID = " +TIPO_ATIVO_ID
        
        const sql = `SELECT * 
                        FROM MOVIMENTACOES
                        JOIN INVESTIMENTOS ON (MOVIMENTACOES.INVESTIMENTOS_ID = INVESTIMENTOS.ID)
                        WHERE 
                            INVESTIMENTOS.USUARIO_ID = ${USUARIO_ID}
                        AND MOVIMENTACOES.DATA_MOVIMENTACAO BETWEEN '${dataInicio}' AND '${dataFinal}'
                        AND ((INVESTIMENTOS.PAPEL = '${PAPEL}') OR ('${PAPEL}' IS NULL) OR ('${PAPEL}' = ''))
                        ${tipoAtivo}
                        `;
        return sql;
    }
}

export default Movimentacoes;