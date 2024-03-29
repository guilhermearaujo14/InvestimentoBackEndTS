class movimentacoes{
    INVESTIMENTOS_ID: number;
    QUANTIDADE: number;
    PRECO: number;
    TOTAL: number;
    DATA_MOVIMENTACAO: Date;
    isCOMPRA: boolean;
    isVENDA: boolean;
    DATA_INCLUSAO: Date

    constructor(INVESTIMENTOS_ID: number, QUANTIDADE: number, PRECO: number, TOTAL: number, DATA_MOVIMENTACAO: Date, isCOMPRA:boolean, isVENDA: boolean, DATA_INCLUSAO: Date){
        this.INVESTIMENTOS_ID = INVESTIMENTOS_ID;
        this.QUANTIDADE = QUANTIDADE;
        this.PRECO = PRECO;
        this.TOTAL = TOTAL;
        this.DATA_MOVIMENTACAO = DATA_MOVIMENTACAO;
        this.isCOMPRA = isCOMPRA;
        this.isVENDA = isVENDA;
        this.DATA_INCLUSAO = DATA_INCLUSAO
    }

    async Criamovimentacao(INVESTIMENTOS_ID: number, QUANTIDADE: number, PRECO: number, TOTAL: number, DATA_MOVIMENTACAO: Date, isCOMPRA: boolean, isVENDA: boolean, DATA_INCLUSAO: Date){
        const sql  = `INSERT INTO MOVIMENTACOES VALUES (${INVESTIMENTOS_ID},${QUANTIDADE},${PRECO},${TOTAL},${DATA_MOVIMENTACAO},${isCOMPRA},${isVENDA},${DATA_INCLUSAO})`;
        return sql;
    }
}

export default movimentacoes;