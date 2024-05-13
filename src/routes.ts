import  Express , { Router} from "express";
const router = Router();



/* IMPORTAÇÃO ARQUIVOS INVESTIMENTOS */
import CadastrarInvestimentosController from "./controllers/investimentosController/CadastraInvestimentos";
import ExibeMeusInvestimentos from '../src/controllers/investimentosController/ExibeMeusInvestimentos';
import Pesquisainvestimento from "./controllers/investimentosController/PesquisaInvestimento";

/* IMPORTAÇÃO ARQUIVO TOTALIZADORES */
import ExibeTotalizadores from "./controllers/totalizadoresController";

/* IMPORTAÇÃO ARQUIVOS USUARIO */
import Login from "./controllers/usuarioController/Login";
import CadastraUsuario from "./controllers/usuarioController/CadastraUsuario";
import ValidaCamposCadastroUsuario from "./middlewares/UsuarioMiddlewar/ValidaCampos";


/* IMPORTAÇÃO ARQUIVOS MOVIMENTAÇÃO */
import PesquisaMovimentacao from "./controllers/movimentacoesController/PesquisaMovimentacao";
import ExcluirMovimentacao from "./controllers/movimentacoesController/ExcluiMovimentacao";
import PesquisaMovimentacaoByIdController from "./controllers/movimentacoesController/PesquisaMovimentacaoById";

/*IMPORTACAO GOOGLE */
import ListGoogleSheets from "./controllers/GoogleSheetsController";

/* IMPORTACAO PLANILHA */
import PlanilhaImportacao from "../src/controllers/ImportarPlanilhaController";


/* ROTAS INVESTIMENTOS */
router.post('/cadastraInvestimento/:USUARIO_ID', CadastrarInvestimentosController);
router.get('/meusInvestimentos/:USUARIO_ID', ExibeMeusInvestimentos);
router.get('/investimento/:USUARIO_ID', Pesquisainvestimento);

/* ROTAS MOVIMENTAÇÕES */
router.get('/movimentacoes/:USUARIO_ID', PesquisaMovimentacao);
router.delete('/excluirMovimentacao/:USUARIO_ID/:MOVIMENTACAO_ID', ExcluirMovimentacao);
router.get('/movimentacao/:MOVIMENTACAO_ID', PesquisaMovimentacaoByIdController);

/* ROTAS TOTALLIZADORES */
router.get('/totalizadores/:USUARIO_ID', ExibeTotalizadores);


/* ROTAS USUARIO */
router.post('/Login', Login);
router.post('/Usuario', ValidaCamposCadastroUsuario, CadastraUsuario);

/* ROTA IMPORTAÇÃO PLANILHA */
router.post('/importacaoPlanilha/:USUARIO_ID', PlanilhaImportacao)

// testes de rotas especificas
router.get('/listGoogle', ListGoogleSheets);


import testeController from './controllers/movimentacoesController/teste'
router.get('/teste', testeController)


export default router;

