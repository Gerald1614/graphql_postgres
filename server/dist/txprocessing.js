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
const mqtt_1 = require("mqtt");
const index_1 = __importDefault(require("./models/index"));
exports.transactions = [];
function txprocessing() {
    const client = mqtt_1.connect('mqtt://mqtt');
    client.on('connect', function () {
        client.subscribe('CCtransaction', function (err) {
            if (!err) {
                console.log('server ready for messages');
            }
        });
    });
    client.on('message', function (topic, message) {
        if (topic === 'CCtransaction') {
            let msg = JSON.parse(message.toString());
            exports.transactions.push(msg);
            let d = new Date(msg.timestamp);
            console.log(`#server received: withdrawal of ${msg.amount} with ${msg.cardnumber} on ${d}`);
        }
        checkFraud();
    });
}
exports.txprocessing = txprocessing;
function checkFraud() {
    // timeDuration in seconds
    let timeDuration = 10;
    let evalPeriod = exports.transactions[exports.transactions.length - 1].timestamp - timeDuration * 1000;
    const analyzedSet = exports.transactions.filter(transaction => transaction.timestamp >= evalPeriod);
    console.log(analyzedSet);
    const fraud = analyzedSet.filter((tx, index, arr) => {
        return arr.map(mapObj => mapObj.cardid).indexOf(tx.cardid) !== index;
    });
    if (fraud.length > 0) {
        fraud.every((fraudTx) => __awaiter(this, void 0, void 0, function* () {
            const fraudCard = yield index_1.default.creditcards.findById(fraudTx.cardid);
            console.log(`FRAUD ALERT: Contact ${fraudCard.userid.username} on card ${fraudCard.cardnumber}`);
        }));
    }
}
//# sourceMappingURL=txprocessing.js.map