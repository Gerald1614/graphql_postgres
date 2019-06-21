import { connect } from 'mqtt'
import fetch from 'node-fetch'
import uuidv4 from 'uuid/v4.js';

const interval = 3000;
interface Tx {
  id: string,
  cardnumber: string,
  cardid?: string,
  amount?: number,
  timestamp?: number
}
let txs=[]
let cards = fetch('http://app:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ creditcards { cardnumber, cardid }}' }),
})
  .then(res => res.json())
  .then(res => {
    txs = res.data.creditcards.map(card => {
      return {'cardnumber': card.cardnumber}} )
    console.log(txs)
    res.data
  })
  .catch(err => console.log(err));
// let txs = [
//   {'id': 'er121323kl23r2rr', 'cardnumber': '5544-333-2222'},
//   {'id': 'ye45ui4566', 'cardnumber': '3490-456-9870'},
//   {'id': 'pkpkk456kll335', 'cardnumber': '6677-353-1223'},
//   {'id': 'poppi3455345r', 'cardnumber': '5894-453-4352'},
//   {'id': 'er121323kl23r2rr', 'cardnumber': '5566-333-111'}
// ]

const client = connect('mqtt://mqtt');
client.on('connect', () => {
  setInterval( async () => { 
    let tx:Tx = await txs[Math.floor(Math.random()*txs.length)]
    tx.timestamp = Date.now()
    tx.id = uuidv4()
    tx.amount = Math.floor(Math.random()*1000)
    client.publish('CCtransaction', JSON.stringify(tx)) 
  }, interval);
})
