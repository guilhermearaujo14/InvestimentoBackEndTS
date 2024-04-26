import fs from 'node:fs/promises'
import path from 'node:path';

async function GravaLog(mensagem: string){
try {
    const diretorio = 'log';
    const arquivo = 'log.txt';
    const caminhoArquivo = path.join(__dirname,arquivo);
    const dateTime = new Date().toLocaleDateString();

    const log = `${dateTime} - ${mensagem};\n`;
    
    await fs.appendFile(caminhoArquivo, log);
} catch (error) {
    
}
    
}

export default GravaLog;