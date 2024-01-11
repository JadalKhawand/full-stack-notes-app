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
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }
    // bearer lkajdl;kfj;a.adpfja;ldkfj.sdjhfshdkfjshdf23
    const token = authorization.split(' ')[1]; // 1 since the token is on positoin 1
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        // @ts-ignore
        req.user = yield User.findOne({ _id }).select('_id');
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
});
module.exports = requireAuth;
