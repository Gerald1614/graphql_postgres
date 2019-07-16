import { connect } from 'mqtt';
import fetch from 'node-fetch';
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



