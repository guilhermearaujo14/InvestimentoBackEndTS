import db from '../../database';

async function ExibeTotalizadores(){
    const con = await db();
    try {
        
    } catch (error) {
        console.log('[ERROR] - ExibeTotalizadores: ', error)
        throw {isSucesso: false, message: 'Ops.. não foi possível trazer dados dos totalizadores!'};
    }
}

export default ExibeTotalizadores