"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./database"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
// import Serverless from "serverless-http";
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://same-deadpool-purple-greece.bohr.io/',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true
}));
app.use(express_1.default.json());
const PORT = 3300;
app.use(routes_1.default);
(0, database_1.default)();
// const servlessApp = Serverless(app);
// export const handler = async (event: any, context: any) => {
//     return await servlessApp(event, context);
//   };
app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});
