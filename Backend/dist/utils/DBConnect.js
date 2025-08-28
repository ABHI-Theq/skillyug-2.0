"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DBConnect = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully");
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "DB Connection Failed";
        console.log("Error: ", errorMessage);
    }
};
exports.default = DBConnect;
