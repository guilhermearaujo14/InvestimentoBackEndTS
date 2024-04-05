import  Express , { Request, Response ,Router} from "express";
const router = Router();



/* IMPORTAÇÃO ARQUIVOS INVESTIMENTOS */
import CadastrarInvestimentosController from "./controllers/investimentosController/CadastraInvestimentos";
import ExibeMeusInvestimentos from '../src/controllers/investimentosController/ExibeMeusInvestimentos'

/* IMPORTAÇÃO ARQUIVO TOTALIZADORES */
import ExibeTotalizadores from "./controllers/totalizadoresController";


/* ROTAS INVESTIMENTOS */
router.post('/cadastraInvestimento/:USUARIO_ID', CadastrarInvestimentosController);
router.get('/meusInvestimentos/:USUARIO_ID', ExibeMeusInvestimentos);


/* ROTAS TOTALLIZADORES */
router.get('/totalizadores/:USUARIO_ID', ExibeTotalizadores);


/* IMPORTAÇÃO ARQUIVOS USUARIO */
import Login from "./controllers/usuarioController/Login";
import CadastraUsuario from "./controllers/usuarioController/CadastraUsuario";
import ValidaCamposCadastroUsuario from "./middlewares/UsuarioMiddlewar/ValidaCampos";

/* ROTAS USUARIO */
router.post('/Login', Login);
router.post('/Usuario', ValidaCamposCadastroUsuario, CadastraUsuario);


// testes de rotas especificas



export default router;

