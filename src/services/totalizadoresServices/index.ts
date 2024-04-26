import LerGoogleSheet from '../../api/google';
import db from '../../database';
import FiltraAtivoByPapel, { listaInterface } from '../../utils/FiltraAtivoByPapel';
import GravaLog from '../GravaLog';



interface listaTipoAtivoInterface{
    PAPEL: string;
    TIPO_ATIVO_ID: number;
    TIPO_ATIVO_DESCRICAO: string;
    QUANTIDADE: number;
    TOTAL: number;
}
interface totalizador{
    TOTAL_GERAL: number;
    TOTAL_ACOES: number;
    TOTAL_FIIS: number;
    TOTAL_FI_AGRO: number;
    TOTAL_ETFS: number;
    TOTAL_BDRS: number;
}


async function ExibeTotalizadores(USUARIO_ID: number){
    const con = await db();
        const sql = `
        SELECT  INVESTIMENTOS.PAPEL, INVESTIMENTOS.TIPO_ATIVO_ID, TIPO_ATIVO.DESCRICAO, INVESTIMENTOS.QUANTIDADE, 0 AS TOTAL  
        FROM INVESTIMENTOS
        JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
        WHERE USUARIO_ID = ?`;

    try {
        let listaInvestimentos: any = await con?.execute(sql,[USUARIO_ID]);
        const listaGoogle: any = await LerGoogleSheet();

        let data = listaInvestimentos[0].map(async (item: listaTipoAtivoInterface) =>{
            let ativo= await FiltraAtivoByPapel(listaGoogle, item.PAPEL);
            let cotacao: any = ativo.ativo?.cotacao;
            item.TOTAL = item.QUANTIDADE * cotacao;
            return item
        });   
        
           return Promise.all(data)
                    .then(response => { 
                        let totais: totalizador[] = [{
                            TOTAL_GERAL: SomaTotal(response),
                            TOTAL_ACOES: FiltraTipoAtivoSomaTotal(response,1),
                            TOTAL_FIIS: FiltraTipoAtivoSomaTotal(response,2),
                            TOTAL_FI_AGRO: FiltraTipoAtivoSomaTotal(response,5),
                            TOTAL_ETFS: FiltraTipoAtivoSomaTotal(response,3),
                            TOTAL_BDRS: FiltraTipoAtivoSomaTotal(response,4),
                        }];
                        return totais
                        })

        
    } catch (error) {
        console.log('[ERROR] - ExibeTotalizadores: ', error)
        await GravaLog(`ExibeTotalizadores - ${error}`);
        throw {isSucesso: false, message: 'Ops.. não foi possível trazer dados dos totalizadores!'};
    }finally{
    }
}



function FiltraTipoAtivoSomaTotal(lista: listaTipoAtivoInterface[], TIPO_ATIVO_ID: number){
    if(!lista || !TIPO_ATIVO_ID){
        console.log('[ERROR] - FiltraTipoAtivo: Não passado lista ou Tipo de ativo para filtrar');
        return 0
    }
    let listaFiltrada: listaTipoAtivoInterface[] = lista.filter(item => item.TIPO_ATIVO_ID == TIPO_ATIVO_ID);
    
    if(listaFiltrada.length > 0){
        let total: number = listaFiltrada.reduce((total, item) => total + item.TOTAL,0)
        return total
    }else{
        return 0
    }
}

function SomaTotal(lista: listaTipoAtivoInterface[]){
    if(!lista){
        console.log('[ERROR] - FiltraTipoAtivo: Não encontrei uma lista para somar!');
        return 0
    }    
    if(lista.length > 0){
        let total: number = lista.reduce((total, item) => total + item.TOTAL,0)
        return total
    }else{
        return 0
    }
}

export default ExibeTotalizadores