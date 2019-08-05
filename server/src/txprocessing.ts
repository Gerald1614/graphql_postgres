import { connect } from 'mqtt'
import models from './models/index'

interface Transaction {
    id?: string,
    cardnumber: string,
    cardid: string,
    amount?: number,
    timestamp?: number
  }
  interface Transactions extends Array<Transaction>{}

export function txprocessing (){
    const client = connect('mqtt://mqtt_server');
    let transactions:Transactions = []

    client.on('connect', function () {
        client.subscribe('CCtransaction', function (err) {
            if (!err) {
                console.log('server ready for messages')
            }
          })
    })
    
    client.on('message', function (topic, message) {
        if (topic ==='CCtransaction') {
            let msg = JSON.parse(message.toString())
            transactions.push(msg)
            let d = new Date(msg.timestamp)
            client.publish('newTransaction', JSON.stringify(`#server received: withdrawal of ${msg.amount} with ${msg.cardnumber} on ${d}`)) 
            // console.log(`#server received: withdrawal of ${msg.amount} with ${msg.cardnumber} on ${d}`)
        }
        let alert = 'No fraud hourray!'
        checkFraud(transactions)
            .then((status) => {
                if(status !='noFraud') {
                    for(let frauded of status) {
                         alert = `#FRAUD ALERT on cardnumber : ${frauded['card'].cardnumber} Contact ${frauded['card'].userid.username} to check withdrawal amount of $${frauded['transaction'].amount} on ${new Date(frauded['transaction'].timestamp)}`
                    }
                }
                 client.publish('fraudCheck', JSON.stringify(alert))
        })
        .catch((e) =>
          console.log(e)
        );
    })
} 
export async function checkFraud(transactions: Transactions) {
    // timeDuration in seconds
    let timeDuration = 10;
    let evalPeriod = transactions[transactions.length-1].timestamp - timeDuration*1000;
    const analyzedSet = transactions.filter(transaction => transaction.timestamp >= evalPeriod);
    const fraud = analyzedSet.filter((tx, index, arr) => { 
        return arr.map(mapObj => mapObj.cardid).indexOf(tx.cardid) !== index;
    })
     if (fraud.length > 0) {
         let frauded = await Promise.all(fraud.map( async (fraudTx) => {
             return  {card: await models.creditcards.findById(fraudTx.cardid), transaction:fraudTx}
            } ))

                return await Promise.resolve(frauded)


    } else {
        return await Promise.resolve("noFraud")
    }

}
