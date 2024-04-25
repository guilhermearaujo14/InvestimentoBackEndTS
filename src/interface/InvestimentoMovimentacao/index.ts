interface investimentoMovimentacao{
    USUARIO_ID: number;
    TIPO_ATIVO_ID: number;
    PAPEL: string;
    SETOR: string;
    QUANTIDADE_MOVIMENTACAO: number;
    PRECO: number;
    DATA_COMPRA: Date;
    isCOMPRA: boolean;
    isVENDA: boolean;
}


export default investimentoMovimentacao



