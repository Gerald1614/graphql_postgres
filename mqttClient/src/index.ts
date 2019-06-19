import { connect } from 'mqtt'

interface Tx {
  id: string,
  cardnumber: string,
  timestamp?: number
}

let txs = [
  {'id': 'er121323kl23r2rr', 'cardnumber': '5544-333-2222'},
  {'id': 'ye45ui4566', 'cardnumber': '3490-456-9870'},
  {'id': 'pkpkk456kll335', 'cardnumber': '6677-353-1223'},
  {'id': 'poppi3455345r', 'cardnumber': '5894-453-4352'},
  {'id': 'er121323kl23r2rr', 'cardnumber': '5566-333-111'}
]

const client = connect('mqtt://mqtt');
client.on('connect', function () {
  setInterval(function(){ 
    let tx:Tx = txs[Math.floor(Math.random()*txs.length)]
    tx.timestamp= Date.now()
    console.log('message emitted: ' + JSON.stringify(tx))
    client.publish('CCtransaction', JSON.stringify(tx)) 
  }, 3000);
})
