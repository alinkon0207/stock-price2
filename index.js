
const http = require("https");
const dotenv = require("dotenv");


dotenv.config();

const API_KEY = process.env.API_KEY;

const options = {
	"method": "GET",
	"hostname": "api.twelvedata.com",
	"port": null,
	"path": `/time_series?apikey=${API_KEY}&interval=1min&symbol=AAPL&type=stock&outputsize=1`
};


const req = http.request(options, function (res) {
	const prices = [];

	res.on("data", function (chunk) {
		const json_chunk = JSON.parse(chunk);
        prices.push(json_chunk.values[0]);
	});

	res.on("end", function () {
		console.log(prices);
	});
});

req.end();
