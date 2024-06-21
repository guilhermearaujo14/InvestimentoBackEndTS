"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleSheetsServices_1 = __importDefault(require("../../services/GoogleSheetsServices"));
async function ListGoogleSheets(req, res) {
    try {
        const response = await (0, GoogleSheetsServices_1.default)();
        res.status(200).send(response);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
exports.default = ListGoogleSheets;
