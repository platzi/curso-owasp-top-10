const express = require('express');
const axios = require('axios');
const router = express.Router();

const whitelist = ['dummyjson.com'];

const isWhitelisted = (url) => {
    const urlObj = new URL(url);
    return whitelist.includes(urlObj.hostname);
}

module.exports = function (httpRequestsTotal, dbConfig) {
    router.get('/', async (req, res) => {
        try {
            console.log('Get author by id');
            const { datasource, path } = req.query;
            console.log(`call url: ${datasource}`);

            if (!isWhitelisted(datasource)) {
                httpRequestsTotal.inc({ endpoint: 'authors', method: 'GET', status_code: '400'});
                res.status(400).json({error: 'Invalid datasource'});
                return;
            }

            const response = await axios.get(datasource);
            httpRequestsTotal.inc({ endpoint: 'authors', method: 'GET', status_code: '200'});
            res.json(response.data);
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'authors', method: 'GET', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    });

    return router;
};