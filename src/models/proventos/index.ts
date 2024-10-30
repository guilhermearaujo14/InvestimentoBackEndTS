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

    static async CadastraProvento(USUARIO_ID: number, PAPEL: string, DATA_INCLUSAO: Date){
        const sql = `INSERT INTO PROVENTOS VALUES (USUARIO_ID, PAPEL, DATA_INCLUSAO)
        VALUES (${USUARIO_ID}, '${PAPEL}', ${DATA_INCLUSAO})`
        return sql;
    }


}

export default Proventos