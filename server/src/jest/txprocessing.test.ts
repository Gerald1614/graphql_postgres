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


function generateTx(txs:Txs) {
  const element = { 
    "timestamp": Date.now(),
    "id": uuidv4(),
    "amount": Math.floor(Math.random()*1000)
  }
  return txs.map((tx:Tx) => Object.assign(tx, element) )
}




describe('Test api and check transactions', () =>{
  let cards = []
  beforeAll( async() => {
    cards = await getCards();
  });

  it('getCards', async () => {
    const desiredCards = {"cardid": "a57f40df-d811-4ff9-927e-509e978009aa", "cardnumber": "564-978-4546"}
      expect(cards).toContainEqual(desiredCards);
  });

  it('checkFraud on non fraudulent transactions', async() => {
    let txNoFraud = generateTx(cards)
    const result = await checkFraud(txNoFraud)
    expect(result).toBe('noFraud');
  });

  it('checkFraud on fraudulent transactions', async() => {
    let txs = [cards[0], cards[1], cards[0]]
    let txFraud = await generateTx(txs)
    const result = await checkFraud(txFraud)
    expect(result).toBe(true);
  });

});