class movimentacoes{
    INVESTIMENTO_ID: number;
    QUANTIDADE: number;
    PRECO: number;
    TOTAL: number;
    isCOMPRA: boolean;
    isVENDA: boolean;
    DATA_COMPRA: Date;
    DATA_INCLUSAO: Date

    constructor(INVESTIMENTO_ID: number, QUANTIDADE: number, PRECO: number, TOTAL: number, isCOMPRA:boolean, isVENDA: boolean, DATA_COMPRA: Date, DATA_INCLUSAO: Date){
        this.INVESTIMENTO_ID = INVESTIMENTO_ID;
        this.QUANTIDADE = QUANTIDADE;
        this.PRECO = PRECO;
        this.TOTAL = TOTAL;
        this.isCOMPRA = isCOMPRA;
        this.isVENDA = isVENDA;
        this.DATA_COMPRA = DATA_COMPRA;
        this.DATA_INCLUSAO = DATA_INCLUSAO
    }
}

export default movimentacoes;