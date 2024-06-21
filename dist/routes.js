"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/* IMPORTAÇÃO ARQUIVOS INVESTIMENTOS */
const CadastraInvestimentos_1 = __importDefault(require("./controllers/investimentosController/CadastraInvestimentos"));
const ExibeMeusInvestimentos_1 = __importDefault(require("../src/controllers/investimentosController/ExibeMeusInvestimentos"));
const PesquisaInvestimento_1 = __importDefault(require("./controllers/investimentosController/PesquisaInvestimento"));
/* IMPORTAÇÃO ARQUIVO TOTALIZADORES */
const totalizadoresController_1 = __importDefault(require("./controllers/totalizadoresController"));
/* IMPORTAÇÃO ARQUIVOS USUARIO */
const Login_1 = __importDefault(require("./controllers/usuarioController/Login"));
const CadastraUsuario_1 = __importDefault(require("./controllers/usuarioController/CadastraUsuario"));
const ValidaCampos_1 = __importDefault(require("./middlewares/UsuarioMiddlewar/ValidaCampos"));
/* IMPORTAÇÃO ARQUIVOS MOVIMENTAÇÃO */
const PesquisaMovimentacao_1 = __importDefault(require("./controllers/movimentacoesController/PesquisaMovimentacao"));
const ExcluiMovimentacao_1 = __importDefault(require("./controllers/movimentacoesController/ExcluiMovimentacao"));
const PesquisaMovimentacaoById_1 = __importDefault(require("./controllers/movimentacoesController/PesquisaMovimentacaoById"));
const AtualizaMovimentacao_1 = __importDefault(require("./controllers/movimentacoesController/AtualizaMovimentacao"));
/*IMPORTACAO GOOGLE */
const GoogleSheetsController_1 = __importDefault(require("./controllers/GoogleSheetsController"));
/* IMPORTACAO PLANILHA */
const ImportarPlanilhaController_1 = __importDefault(require("../src/controllers/ImportarPlanilhaController"));
/* ROTAS INVESTIMENTOS */
router.post('/cadastraInvestimento/:USUARIO_ID', CadastraInvestimentos_1.default);
router.get('/meusInvestimentos/:USUARIO_ID', ExibeMeusInvestimentos_1.default);
router.get('/investimento/:USUARIO_ID', PesquisaInvestimento_1.default);
/* ROTAS MOVIMENTAÇÕES */
router.get('/movimentacoes/:USUARIO_ID', PesquisaMovimentacao_1.default);
router.delete('/excluirMovimentacao/:USUARIO_ID/:MOVIMENTACAO_ID', ExcluiMovimentacao_1.default);
router.get('/movimentacao/:MOVIMENTACAO_ID', PesquisaMovimentacaoById_1.default);
router.put('/AtualizaMovimentacao/:USUARIO_ID', AtualizaMovimentacao_1.default);
/* ROTAS TOTALLIZADORES */
router.get('/totalizadores/:USUARIO_ID', totalizadoresController_1.default);
/* ROTAS USUARIO */
router.post('/Login', Login_1.default);
router.post('/Usuario', ValidaCampos_1.default, CadastraUsuario_1.default);
/* ROTA IMPORTAÇÃO PLANILHA */
router.post('/importacaoPlanilha/:USUARIO_ID', ImportarPlanilhaController_1.default);
// testes de rotas especificas
router.get('/listGoogle', GoogleSheetsController_1.default);
const teste_1 = __importDefault(require("./controllers/movimentacoesController/teste"));
router.get('/teste', teste_1.default);
exports.default = router;
