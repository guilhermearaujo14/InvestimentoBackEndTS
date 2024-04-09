import  Express , { Request, Response ,Router} from "express";
const router = Router();



/* IMPORTAÇÃO ARQUIVOS INVESTIMENTOS */
import CadastrarInvestimentosController from "./controllers/investimentosController/CadastraInvestimentos";
import ExibeMeusInvestimentos from '../src/controllers/investimentosController/ExibeMeusInvestimentos'

/* IMPORTAÇÃO ARQUIVO TOTALIZADORES */
import ExibeTotalizadores from "./controllers/totalizadoresController";

/* IMPORTAÇÃO ARQUIVOS USUARIO */
import Login from "./controllers/usuarioController/Login";
import CadastraUsuario from "./controllers/usuarioController/CadastraUsuario";
import ValidaCamposCadastroUsuario from "./middlewares/UsuarioMiddlewar/ValidaCampos";


/* IMPORTAÇÃO ARQUIVOS MOVIMENTAÇÃO */
import PesquisaMovimentacao from "./controllers/movimentacoesController/PesquisaMovimentacao";



/* ROTAS INVESTIMENTOS */
router.post('/cadastraInvestimento/:USUARIO_ID', CadastrarInvestimentosController);
router.get('/meusInvestimentos/:USUARIO_ID', ExibeMeusInvestimentos);

/* ROTAS MOVIMENTAÇÕES */
router.get('/movimentacoes/:USUARIO_ID', PesquisaMovimentacao)

/* ROTAS TOTALLIZADORES */
router.get('/totalizadores/:USUARIO_ID', ExibeTotalizadores);


/* ROTAS USUARIO */
router.post('/Login', Login);
router.post('/Usuario', ValidaCamposCadastroUsuario, CadastraUsuario);


// testes de rotas especificas



export default router;

