"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_js_1 = __importDefault(require("uuid/v4.js"));
const userResolvers = {
    Query: {
        users: (parent, args, { models }) => {
            return models.users.findAll();
        },
        user: (parent, { id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            return yield models.users.findById(id);
        }),
        me: (parent, args, { me }) => {
            return me;
        }
    },
    Mutation: {
        createUser: (parent, { username }, { me, models }) => __awaiter(this, void 0, void 0, function* () {
            const id = v4_js_1.default();
            const user = {
                id,
                username,
            };
            yield (models.users).createUser(user);
            return user;
        }),
        deleteUser: (parent, { id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            return yield (models.users).deleteUser(id);
        }),
    }
};
exports.default = userResolvers;
//# sourceMappingURL=user.js.map