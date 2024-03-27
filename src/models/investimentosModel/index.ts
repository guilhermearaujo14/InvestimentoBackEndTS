class Investimentos {
    //ID?: number;
    USUARIO_ID: number;
    PAPEL: string;
    QUANTIDADE: number;
    PRECO_MEDIO: number;
    TOTAL_INVESTIDO: number;

    constructor(USUARIO_ID: number, PAPEL: string, QUANTIDADE: number, PRECO_MEDIO: number, TOTAL_INVESTIDO: number){
        //this.ID = ID
        this.USUARIO_ID = USUARIO_ID
        this.PAPEL = PAPEL
        this.QUANTIDADE = QUANTIDADE
        this.PRECO_MEDIO = PRECO_MEDIO
        this.TOTAL_INVESTIDO = TOTAL_INVESTIDO    
    }

    CriaInvestimento(USUARIO_ID: number, PAPEL: string, QUANTIDADE: number, PRECO_MEDIO: number, TOTAL_INVESTIDO: number){
        const sql = `INSERT INTO INVESTIMENTOS VALUES (${USUARIO_ID},${PAPEL},${QUANTIDADE},${PRECO_MEDIO},${TOTAL_INVESTIDO})`
        return sql;
    }

    GetInvestimentos(ID?: number, USUARIO_ID?: number, PAPEL?: string){
        const sql = `
            SELECT * FROM INVESTIMENTOS 
            WHERE 
                ((ID = ${ID}) OR (${ID} IS NULL) OR (${ID} = '')) 
                AND ((USUARIO_ID = ${USUARIO_ID} ) OR (${USUARIO_ID} IS NULL) OR (${USUARIO_ID} = ''))
                AND PAPEL = ${PAPEL}`
        return sql;
    }
}

export default Investimentos