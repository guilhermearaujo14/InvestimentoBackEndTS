"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function Teste(req, res) {
    try {
        return res.status(200).send('Ok');
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
exports.default = Teste;
