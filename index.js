
const WebSocket = require('ws');
const dotenv = require('dotenv');


dotenv.config();

const API_KEY = process.env.API_KEY;


const main = () => {
    try {
        let ws = new WebSocket(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${API_KEY}`);

        ws.onopen = (e) => {
            console.log('[ws onopen]');
            
            let sendData = {
                "action": "subscribe", 
                "params": {
                    "symbols": [{
                        "symbol": "AAPL", 
                        "exchange": "NASDAQ", 
                        "price": true
                    }], 
                    "event": "price"
                }
            };
            ws.send(JSON.stringify(sendData));
        };

        ws.onmessage = e => {
            let transaction = JSON.parse(e.data);

            console.log('[onmsg]', transaction);
            if (transaction.event == 'price') {
                const txTime = transaction.timestamp;
                console.log(`  input_time: ${txTime}  price: ${transaction.price}`);
            }
        };

        ws.onclose = function () {
            console.log('[onclose]');
        };
    } catch (err) {
        console.error(err);
    }
};


main();
