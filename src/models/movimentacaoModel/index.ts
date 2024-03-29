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
}

export default Movimentacoes;