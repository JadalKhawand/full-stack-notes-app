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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator = require('validator');
const prisma = new client_1.PrismaClient();
class User {
    static signup({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            if (!email || !password) {
                throw new Error('All fields must be filled');
            }
            if (!validator.isEmail(email)) {
                throw new Error('Email is not valid');
            }
            if (!validator.isStrongPassword(password)) {
                throw new Error('Password not strong enough');
            }
            const exists = yield prisma.user.findUnique({ where: { email } });
            if (exists) {
                throw new Error('Email already in use');
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hash = yield bcryptjs_1.default.hash(password, salt);
            const user = yield prisma.user.create({
                // @ts-ignore
                data: { email, password: hash },
            });
            return user;
        });
    }
    static login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new Error('All fields must be filled');
            }
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new Error('Incorrect email');
            }
            // @ts-ignore
            const match = yield bcryptjs_1.default.compare(password, user.password);
            if (!match) {
                throw new Error('Incorrect Password');
            }
            return user;
        });
    }
}
exports.default = User;
