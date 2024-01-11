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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUsers = exports.updateNote = exports.deleteNote = exports.getNote = exports.getNotes = exports.createNote = exports.test = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const test = (req, res) => {
    res.status(200).send("OK");
};
exports.test = test;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const user = yield prisma.note.create({
        data: {
            title: title,
            content: content,
        },
    });
    console.log(user);
    res.json(user);
});
exports.createNote = createNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield prisma.note.findMany({});
    res.json(notes);
});
exports.getNotes = getNotes;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.id);
    const notes = yield prisma.note.findUnique({
        where: {
            id: user_id,
        },
    });
    if (isNaN(user_id))
        return res.status(400).send("user not found");
    res.json(notes);
});
exports.getNote = getNote;
// delete a note
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.id);
    const notes = yield prisma.note.delete({
        where: {
            id: user_id,
        },
    });
    if (isNaN(user_id))
        return res.status(400).send("user not found");
    res.json(notes);
});
exports.deleteNote = deleteNote;
// update note
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.id);
    const notes = yield prisma.note.update({
        where: {
            id: user_id,
        },
        data: {
            content: req.body.content,
        }
    });
    if (isNaN(user_id))
        return res.status(400).send("user not found");
    res.json(notes);
});
exports.updateNote = updateNote;
// get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({});
    res.json(users);
});
exports.getUsers = getUsers;
// delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = parseInt(req.params.id);
    const users = yield prisma.user.delete({
        where: {
            id: user_id,
        }
    });
    res.json(users);
});
exports.deleteUser = deleteUser;
