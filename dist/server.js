"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const corsMiddleware_1 = __importDefault(require("./middleware/corsMiddleware"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
try {
    mongoose_1.default.connect('mongodb+srv://mpmayur2251998:DM1Qv37pUTlWovTD@cluster0.mlfkoez.mongodb.net/database?retryWrites=true&w=majority', {});
    console.log("DBconnected");
}
catch (e) {
    console.log(e);
}
app.use(corsMiddleware_1.default);
app.use(body_parser_1.default.json());
app.use('/api', userRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
