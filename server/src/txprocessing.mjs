import connect from './utils/mqtt.cjs'

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
        // if (topic ==='CCtransaction') {
            console.log('#server received: ' +message.toString())
        // }
    
    })
} 