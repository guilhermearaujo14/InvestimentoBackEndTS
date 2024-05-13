"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../../routes"));
const database_1 = __importDefault(require("../../database"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://same-deadpool-purple-greece.bohr.io'
}));
app.use(express_1.default.json());
const PORT = 3300;
app.use(routes_1.default);
(0, database_1.default)();
const servlessApp = (0, serverless_http_1.default)(app);
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    return yield servlessApp(event, context);
});
exports.handler = handler;
/*
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando na porta ${PORT}`);
})
*/ 
