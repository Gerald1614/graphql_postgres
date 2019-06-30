import { connect } from 'mqtt'
import models from './models/index'

export let transactions = []
export function txprocessing (){
    const client = connect('mqtt://mqtt');

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
            console.log(`#server received: withdrawal of ${msg.amount} with ${msg.cardnumber} on ${d}`)
        }
        checkFraud()
    })
} 
function checkFraud() {
    // timeDuration in seconds
    let timeDuration = 10;
    let evalPeriod = transactions[transactions.length-1].timestamp - timeDuration*1000;
    const analyzedSet = transactions.filter(transaction => transaction.timestamp >= evalPeriod);
    const fraud = analyzedSet.filter((tx, index, arr) => { 
        return arr.map(mapObj => mapObj.cardid).indexOf(tx.cardid) !== index;
    })

     if (fraud.length > 0) {
         fraud.every( async (fraudTx) => {
            console.log(`#FRAUD ALERT on cardid - ${fraudTx.cardid} cardnumber : ${fraudTx.cardnumber} ` )
             const fraudCard = await models.creditcards.findById(fraudTx.cardid)
             console.log(`#CONTACT ${fraudCard.userid.username}`)
            } )
    }
}
