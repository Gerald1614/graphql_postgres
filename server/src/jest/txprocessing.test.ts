import fetch from 'node-fetch'
import uuidv4 from 'uuid/v4.js';
import { checkFraud } from '../txprocessing';

interface Tx {
    id?: string,
    cardnumber: string,
    cardid: string,
    amount?: number,
    timestamp?: number
  }
  
  interface Txs extends Array<Tx>{}

  async function getCards() {
    console.log('getcards initiated')
    return await fetch('http://app:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ creditcards { cardnumber, cardid }}' }),
      })
        .then(res => res.json())
        .then(res => {
          return res.data.creditcards.map(card => {
            return {'cardnumber': card.cardnumber, 'cardid': card.cardid}} )
        })
        .catch(err => console.log(err));
  }

// let txFraud = generateTx([cards[0], cards[1], cards[0]])

function generateTx(tx) {
    for (let i=0; i>=2; i++) {
        tx[i].timestamp = Date.now()
        tx[i].id = uuidv4()
        tx[i].amount = Math.floor(Math.random()*1000)
    }
    console.log(tx)
    return tx
}


test('getCards', async () => {
  const desiredCards = {"cardid": "a57f40df-d811-4ff9-927e-509e978009aa", "cardnumber": "564-978-4546"}
    const cards = await getCards();
    expect(cards).toContainEqual(desiredCards);
});

test('checkFraud on non fraudulent transactions', async() => {
  let cards = await getCards()
  let txNoFraud = await generateTx(cards)
  const result = await checkFraud(txNoFraud)
  expect(result).toBe('noFraud');

});

// test('checkFraud on fraudulent transactions', async() => {
//   jest.setTimeout(10000);
//   const result = await checkFraud(txFraud)
//   expect(result).toContain('username');
// });