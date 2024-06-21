import db from '../../../database';
import MeusInvestimentos from '../../../interface/MeusInvestimentos';
import FiltraAtivoByPapel from '../../../utils/FiltraAtivoByPapel';
import LerGoogleSheet from '../../../externos/google';

async function ExibeMeusInvestimentos(USUARIO_ID: number){
    const con = await db();
    const sql = `
    SELECT INVESTIMENTOS.ID, INVESTIMENTOS.PAPEL, INVESTIMENTOS.TIPO_ATIVO_ID , TIPO_ATIVO.DESCRICAO, INVESTIMENTOS.PRECO_MEDIO, INVESTIMENTOS.TOTAL_INVESTIDO,
    INVESTIMENTOS.QUANTIDADE, 0 COTACAO, 0 TOTAL_ATUAL, 0 PERDA_LUCRO
    FROM INVESTIMENTOS
    JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
    WHERE USUARIO_ID = ?
    AND INVESTIMENTOS.QUANTIDADE > 0
    ORDER BY INVESTIMENTOS.TIPO_ATIVO_ID ASC, INVESTIMENTOS.PAPEL`;
    try {
        const result: any = await con?.execute(sql, [USUARIO_ID]);
        const listaGoogle: any = await LerGoogleSheet();
        result[0].map(async (item: any)=>{
            let Ativo = FiltraAtivoByPapel(listaGoogle, item.PAPEL);
            let cotacao = Ativo.ativo?.cotacao;
            item.COTACAO = cotacao
            item.TOTAL_ATUAL = item.COTACAO * item.QUANTIDADE;
            item.PERDA_LUCRO = item.TOTAL_ATUAL - item.TOTAL_INVESTIDO;
            return
        })

        const meusInvestimentos: MeusInvestimentos[] = result
        return meusInvestimentos[0];


    } catch (error) {
        console.log('[ERROR] - ExibeMeusInvestimentos: ', error);
        return {isSucesso: false, message: 'Ops... Não foi possivel trazer os dados do seu investimento!'}
    }finally{
        await con?.end();
    }
}




export default ExibeMeusInvestimentos;