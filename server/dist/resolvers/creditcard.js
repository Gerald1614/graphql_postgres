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
const creditcardResolvers = {
    Query: {
        creditcards: (parent, args, { models }) => {
            return models.creditcards.findAll();
        },
        creditcard: (parent, { cardid }, { models }) => {
            return models.creditcards.findById(cardid);
        },
    },
    Mutation: {
        createCreditcard: (parent, { userid, cardnumber }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const cardid = v4_js_1.default();
            const creditcard = {
                cardid,
                cardnumber,
                userid,
            };
            yield (models.creditcards).createCreditcard(creditcard);
            return creditcard;
        }),
        updateCreditcard: (parent, { cardid, cardnumber }, { models }) => __awaiter(this, void 0, void 0, function* () {
            return yield (models.creditcards).updateCreditcard(cardid, cardnumber);
        }),
        deleteCreditcard: (parent, { cardid }, { models }) => __awaiter(this, void 0, void 0, function* () {
            return yield (models.creditcards).deleteCreditcard(cardid);
        }),
    },
};
exports.default = creditcardResolvers;
//# sourceMappingURL=creditcard.js.map