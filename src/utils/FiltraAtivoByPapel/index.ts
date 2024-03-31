export interface listaInterface{
    papel: string;
    nome: string;
    cotacao: number;
    tipo: number;
}
function FiltraAtivoByPapel(lista: listaInterface[], papel: string){
    try {
        const ativo = lista.filter(item => item.papel === papel)
        if(ativo.length > 0){
            return ativo;
        }
        return false;
    } catch (error) {
        console.log('[ERROR] - FiltraAtivoByPapel: ', error);
        return false;
    }
}


export default FiltraAtivoByPapel;