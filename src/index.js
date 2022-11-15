import express from 'express';

import { scrape } from './scraper.js';

const app = express();
const port = 12345;

let data = null;
let chronologicalData = null;
let countries = new Set();
let lastScraped = Date.now();
await checkData();

async function checkData() {
    if (data === null || Date.now() - lastScraped > 1000 * 60 * 60 * 12) {
        let { csv, chronological } = await scrape();
        data = csv;
        chronologicalData = chronological;
        lastScraped = Date.now();
        data.forEach((entry) => {
            countries.add(entry.location);
        });
    }
}

app.get('/raw', async (req, res) => {
    await checkData();
    res.json(data);
});

app.get('/country', async (req, res) => {
    await checkData();
    res.json(Array.from(countries.values()));
});

app.get('/country/:code', async (req, res) => {
    await checkData();
    res.json(
        data.filter((entry) => {
            return entry.location === req.params.code;
        })
    );
});

app.get('/history/:country', async (req, res) => {
    await checkData();
    if (chronologicalData[req.params.country]) {
        res.json(chronologicalData[req.params.country]);
    } else {
        res.status(404).send(
            `We have no data on your country "${req.params.status}". See all countries we have data on at "/country".`
        );
    }
});

app.listen(port, () => console.log(`listening on port ${port}`));
