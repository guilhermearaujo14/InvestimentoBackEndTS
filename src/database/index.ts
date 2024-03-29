import mysql from 'mysql2/promise';
import 'dotenv/config';


async function conexao (){
    const connetion = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATA_BASE,
    });

    if(connetion){
        console.log('Conexão com banco de dados realizada');
        return connetion;
    }else{
        console.log('Não foi possivel conectar com banco de dados.');
    }
}



export default conexao

