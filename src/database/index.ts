import mysql from 'mysql2/promise';
import 'dotenv/config';


async function conexao (){
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATA_BASE,
        });
    
        if(connection){
            console.log('Conexão com banco de dados realizada');
            return connection;
        }else{
            console.log('Não foi possivel conectar com banco de dados.');
        } 
    } catch (error) {
        console.log('Erro ao conectar Banco')
    }
       
}

async function fecharConexao(connection: any) {
    if (connection) {
        try {
            await connection.end();
            console.log('Conexão com banco de dados fechada');
        } catch (error) {
            console.error('Erro ao fechar a conexão com o banco de dados:', error);
            throw error; // Lança o erro para ser tratado pelo código que chamou a função
        }
    }
}


export default conexao

