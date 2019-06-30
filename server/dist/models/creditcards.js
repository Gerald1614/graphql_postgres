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
const index_1 = __importDefault(require("../db/index"));
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.default.query(`SELECT creditcards.cardid, creditcards.cardnumber, creditcards.userid, users.username 
  FROM creditcards JOIN users 
  ON users.id = creditcards.userid`, '', '')
            .then(res => {
            const result = [];
            console.log(res.rows);
            let creditcard;
            for (creditcard of Object.values(res.rows)) {
                result.push({ cardid: creditcard.cardid, cardnumber: creditcard.cardnumber, userid: { id: creditcard.userid, username: creditcard.username } });
            }
            return result;
        })
            .catch(e => {
            console.error(e.stack);
            return [];
        });
    });
}
exports.findAll = findAll;
function findById(creditcardId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.default.query(`SELECT creditcards.cardid, creditcards.cardnumber, creditcards.userid, users.username 
  FROM creditcards JOIN users
  ON users.id = creditcards.userid`, '', '')
            .then(res => {
            console.log(res);
            const result = res.rows.find((el) => {
                return el.cardid === creditcardId;
            });
            console.log(result);
            return { cardid: result.cardid, cardnumber: result.cardnumber, userid: { id: result.userid, username: result.username } };
        })
            .catch(e => console.error(e.stack));
    });
}
exports.findById = findById;
function createCreditcard(creditcard) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            text: 'INSERT INTO creditcards("cardid", "cardnumber", "userid" ) VALUES($1, $2, $3) RETURNING *',
            values: [creditcard.cardid, creditcard.cardnumber, creditcard.userid]
        };
        return yield index_1.default.query(query, '', '')
            .then(res => {
            return res.rows[0];
        })
            .catch(e => console.error(e.stack));
    });
}
exports.createCreditcard = createCreditcard;
function updateCreditcard(cardid, cardnumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.default.query('UPDATE creditcards SET cardnumber = $1 WHERE cardid = $2 RETURNING *', [cardnumber, cardid], '')
            .then(res => {
            return res.rows[0];
        })
            .catch(e => console.error(e.stack));
    });
}
exports.updateCreditcard = updateCreditcard;
function deleteCreditcard(creditcardId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.default.query('DELETE FROM creditcards WHERE creditcards.cardid=$1', [creditcardId], '')
            .then(res => {
            return true;
        })
            .catch(e => {
            console.error(e.stack);
            return false;
        });
    });
}
exports.deleteCreditcard = deleteCreditcard;
//# sourceMappingURL=creditcards.js.map