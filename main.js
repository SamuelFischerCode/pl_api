const express = require("express");
const { readFileSync } = require("fs");
require('dotenv').config();
const app = express();
const port = 3000;
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.PL_API_KEY);

let db;

app.get("*", (req, res) => {
	let s = "";
	for (let i = 0; i < db.db.length; i++) {
		s = `${s}${db.db[i][0]}<br>`;
	}
	res.send(s);
});

app.listen(port, () => {
	/*const params = {
		q: "manchester united",
		location: "austin, texas, united states"
	};

	const callback = function (data) {
		console.log(data["sports_results"]);
	};

	// Show result as JSON
	search.json(params, callback);*/
	search.json({
		q: "premier league matches"
	}, (data) => {
		console.log(data["sports_results"]["games"]);
	});
	db = JSON.parse(readFileSync("database.json"));
});