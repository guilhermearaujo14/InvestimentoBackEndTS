import LerGoogleSheet from "../../externos/google";


async function ListGoogleSheets(){
    try {
        const lista: [] = await LerGoogleSheet();

        return lista;
    } catch (error) {
     console.log('[ERROR] - ListGoogleSheets: ', error)
     return {isSucesso: false, message: 'Ops... Não foi possível buscar dados do google.'}   
    }
}

export default ListGoogleSheets;