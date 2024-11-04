class Proventos{
    ID?: number;
    USUARIO_ID: number;
    PAPEL: string;
    DATA_INCLUSAO: Date;
    
    constructor(ID: number, USUARIO_ID: number, PAPEL: string, DATA_INCLUSAO: Date){
        this.ID = ID,
        this.USUARIO_ID = USUARIO_ID,
        this.PAPEL = PAPEL,
        this.DATA_INCLUSAO = DATA_INCLUSAO
    }

    static async CadastraProvento(USUARIO_ID: number, PAPEL: string){
        const sql = `INSERT INTO PROVENTOS (USUARIO_ID, PAPEL, DATA_INCLUSAO)
        VALUES (${USUARIO_ID}, '${PAPEL}', CURRENT_TIMESTAMP());`
        return sql;
    }


    static async GetProventoByPapel(USUARIO_ID: number, PAPEL: string){
        const sql = `SELECT * FROM PROVENTOS WHERE USUARIO_ID = ${USUARIO_ID} AND PAPEL = '${PAPEL}'`;
        return sql;
    }

}

export default Proventos