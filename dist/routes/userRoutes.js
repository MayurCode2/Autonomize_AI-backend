"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post('/users/:username', userController_1.default.createUser);
router.get('/users/search', userController_1.default.searchUsers);
router.delete('/users/:username', userController_1.default.softDeleteUser);
router.get('/users/sorted', userController_1.default.sortUsers);
exports.default = router;
