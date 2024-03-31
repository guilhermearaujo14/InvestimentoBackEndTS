import axios from "axios";

async function LerGoogleSheet(){
    const baseURL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.spreadsheets}/values/A1%3AD1850?majorDimension=DIMENSION_UNSPECIFIED&valueRenderOption=UNFORMATTED_VALUE&key=${process.env.API_KEY}`;
    try {
      const response = await axios.get(baseURL);  
      const lista = ConverterJson(response.data.values)
      return lista;
    } catch (error) {
        console.log('[ERROR] - LerGoogleSheet: ', error)
        throw error
    }
}

function ConverterJson(dados: any){
    const [chave1, chave2, chave3, chave4] = dados.shift();
    const lista = dados.map( (item: any[]) =>({
        [chave1] : item[0],
        [chave2] : item[1],
        [chave3] : item[2],
        [chave4] : item[3]
    }))
    return lista
}
export default LerGoogleSheet;