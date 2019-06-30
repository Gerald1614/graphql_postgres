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
        return yield index_1.default.query('SELECT * FROM users', '', '')
            .then(res => {
            const users = res.rows.map((user) => __awaiter(this, void 0, void 0, function* () {
                yield index_1.default.query(`SELECT * FROM creditcards WHERE creditcards.userid = $1`, [user.id], '')
                    .then(res => {
                    user.creditcards = res.rows;
                    console.log(user.creditcards);
                })
                    .catch(e => user.creditcards = []);
                return user;
            }));
            return users;
        })
            .catch(e => console.error(e.stack));
    });
}
exports.findAll = findAll;
function findById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.default.query(`SELECT * FROM users WHERE users.id = $1`, [userId], '')
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            let creditcards = [];
            yield index_1.default.query(`SELECT * FROM creditcards WHERE creditcards.userid = $1`, [userId], '')
                .then(res => {
                creditcards = res.rows;
            })
                .catch(e => {
                console.error(e.stack);
                return creditcards = [];
            });
            let user = { username: res.rows[0].username, id: res.rows[0].id, creditcards: creditcards };
            return user;
        }))
            .catch(e => console.error(e.stack));
    });
}
exports.findById = findById;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            text: 'INSERT INTO users("id", "username") VALUES($1, $2) RETURNING *',
            values: [user.id, user.username],
        };
        return yield index_1.default.query(query, '', '')
            .then(res => {
            console.log(res);
            return res.rows[0];
        })
            .catch(e => console.error(e.stack));
    });
}
exports.createUser = createUser;
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.default.query('DELETE FROM users WHERE users.id=$1', [userId], '')
            .then(res => {
            return true;
        })
            .catch(e => {
            console.error(e.stack);
            return false;
        });
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map