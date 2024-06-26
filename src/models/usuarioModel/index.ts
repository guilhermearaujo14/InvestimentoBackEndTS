class Usuario{
    ID?: number;
    NOME: string;
    CPF: string;
    DATA_NASCIMENTO?: Date;
    TELEFONE?: string;
    EMAIL: string;
    SENHA: string;
    DATA_INCLUSAO?: Date;

    constructor(ID: number, NOME: string, CPF: string, DATA_NASCIMENTO: Date, TELEFONE:string, EMAIL: string, SENHA: string, DATA_INCLUSAO: Date){
        this.ID = ID,
        this.NOME = NOME,
        this.CPF = CPF,
        this.DATA_NASCIMENTO = DATA_NASCIMENTO,
        this.TELEFONE = TELEFONE,
        this.EMAIL = EMAIL,
        this.SENHA = SENHA,
        this.DATA_INCLUSAO = DATA_INCLUSAO
    }


    static async CadastraUsuario(NOME: string, CPF: string, DATA_NASCIMENTO: Date | undefined, TELEFONE:string | undefined, EMAIL: string, SENHA: string){
        let sql = `INSERT INTO USUARIO (NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, DATA_INCLUSAO) 
        VALUES ('${NOME}','${CPF}','${DATA_NASCIMENTO}','${TELEFONE}','${EMAIL}','${SENHA}', now())`
        return sql
    }

    static async PesquisaUsuario(ID?: number, CPF?: string){
        let sql = `SELECT * FROM USUARIO 
                    WHERE 
                        ((USUARIO.ID = ${ID}) OR (${ID} IS NULL) OR (${ID} = '') OR (${ID} = 0)) AND 
                        ((USUARIO.CPF = '${CPF}') OR ('${CPF}' IS NULL) OR ('${CPF}' = ''))`
        return sql;
    }
        
}

export default Usuario