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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DBConnect_1 = __importDefault(require("./utils/DBConnect"));
const razorpay_1 = __importDefault(require("razorpay"));
const paymentRouter_1 = __importDefault(require("./router/paymentRouter"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, DBConnect_1.default)();
exports.instance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use(express_1.default.static("public"));
app.use("/api", paymentRouter_1.default);
app.get('/api/getKey', (req, res) => {
    // Ensure the environment variable is loaded
    if (!process.env.RAZORPAY_KEY) {
        return res.status(500).json({ error: 'RAZORPAY_KEY is not defined' });
    }
    res.status(200).json({ key: process.env.RAZORPAY_KEY });
});
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
