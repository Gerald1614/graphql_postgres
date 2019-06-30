import { connect } from 'mqtt'
import fetch from 'node-fetch'
import uuidv4 from 'uuid/v4.js';

const interval = 3000;
interface Tx {
  id?: string,
  cardnumber: string,
  cardid: string,
  amount?: number,
  timestamp?: number
}
setTimeout(() => {
  let cards = fetch('http://app:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ creditcards { cardnumber, cardid }}' }),
  })
    .then(res => res.json())
    .then(res => {
      cards = res.data.creditcards.map(card => {
        return {'cardnumber': card.cardnumber, 'cardid': card.cardid}} )
    })
    .catch(err => console.log(err));

    const client = connect('mqtt://mqtt');
client.on('connect', () => {
  setInterval( async () => { 
    let tx:Tx = await cards[Math.floor(Math.random()*cards.length)]
    tx.timestamp = Date.now()
    tx.id = uuidv4()
    tx.amount = Math.floor(Math.random()*1000)
    client.publish('CCtransaction', JSON.stringify(tx)) 
  }, interval);
})

}, 5000)

// let cards = [
//   {'cardid': 'er121323kl23r2rr', 'cardnumber': '5544-333-2222'},
//   {'cardid': 'ye45ui4566', 'cardnumber': '3490-456-9870'},
//   {'cardid': 'pkpkk456kll335', 'cardnumber': '6677-353-1223'},
//   {'cardid': 'poppi3455345r', 'cardnumber': '5894-453-4352'},
//   {'cardid': 'er121323kl23r2rr', 'cardnumber': '5566-333-111'}
// ]


