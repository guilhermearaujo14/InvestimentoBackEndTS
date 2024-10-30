class ProventosMovimentacao{
    ID?: number;
    PROVENTOS_ID: number;
    VALOR: number;
    DATA_PAGAMENTO : Date;
    DATA_INCLUSAO: Date;

    constructor(ID: number, PROVENTOS_ID: number, VALOR: number, DATA_PAGAMENTO: Date, DATA_INCLUSAO: Date){
        this.ID = ID,
        this.PROVENTOS_ID = PROVENTOS_ID,
        this.VALOR = VALOR,
        this.DATA_PAGAMENTO = DATA_PAGAMENTO,
        this.DATA_INCLUSAO = DATA_INCLUSAO
    }
}

export default ProventosMovimentacao;