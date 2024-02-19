const express = require('express');
const axios = require('axios');
const router = express.Router();

module.exports = function (httpRequestsTotal, dbConfig) {
    router.get('/', async (req, res) => {
        try {
            console.log('Get author by id');
            const { datasource, path } = req.query;
            console.log(`call url: ${datasource}`);
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