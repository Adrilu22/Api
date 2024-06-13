"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const estudianteRouter_1 = require("./routers/estudianteRouter");
const asignaturaRouter_1 = require("./routers/asignaturaRouter");
const profesorRouter_1 = require("./routers/profesorRouter");
const imparteRouter_1 = require("./routers/imparteRouter");
const inscribeRouter_1 = require("./routers/inscribeRouter");
const db_1 = require("./db");
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Hola a todos esta es mi api');
});
app.use('/api/estudiantes', estudianteRouter_1.estudiantesRouter);
app.use('/api/asignaturas', asignaturaRouter_1.asignaturaRouter);
app.use('/api/profesores', profesorRouter_1.profesorRouter);
app.use('/api/imparte', imparteRouter_1.imparteRouter);
app.use('/api/inscribe', inscribeRouter_1.inscribeRouter);
app.use((req, res) => {
    res.status(404).send({ error: 'Not found', message: 'URL not found' });
});
db_1.db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    }
    else {
        console.log('Database connected');
    }
});
app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});
