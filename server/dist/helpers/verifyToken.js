"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function VerifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).send("Access Denied");
    try {
        const verified = jsonwebtoken_1.default.verify(token, "anythingiwant");
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}
exports.default = VerifyToken;
