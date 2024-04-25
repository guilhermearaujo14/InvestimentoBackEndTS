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
            return {isSucesso: true, ativo: ativo[0]};
        }else{
            return {isSucesso:false};
        }
    } catch (error) {
        console.log('[ERROR] - FiltraAtivoByPapel: ', error);
        return {isSucesso: false};
    }
}


export default FiltraAtivoByPapel;