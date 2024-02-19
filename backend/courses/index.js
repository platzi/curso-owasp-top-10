const express = require('express');
const pg = require('pg');
const router = express.Router();

module.exports = function (httpRequestsTotal, dbConfig) {
    router.get('/', async (req, res) => {
        try {
            const db = new pg.Client(dbConfig);
            await db.connect();
            console.log('Connected to database');
            const result = await db.query(`
            SELECT
                c.id,
                c.course_name,
                c.course_description,
                c.course_code,
                c.author_id
            FROM
                courses c;
            `);
            console.log(`Database message: ${JSON.stringify(result)}`);
            await db.end();
            console.log('Disconnected from database');
            httpRequestsTotal.inc({ endpoint: 'courses', method: 'GET', status_code: '200'});
            res.json(result?.rows);
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'courses', method: 'GET', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })
    
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        if (!id) {
            httpRequestsTotal.inc({ endpoint: 'courses_id', method: 'GET', status_code: '400'});
            res.status(400).json({error: 'Course ID is required'});
            return;
        }
        try {
            const db = new pg.Client(dbConfig);
            await db.connect();
            console.log('Connected to database');
            const courseId = parseInt(id) ? parseInt(id) : 0;
            const result = await db.query(`
            SELECT
                c.id,
                c.course_name,
                c.course_description,
                c.course_code,
                c.author_id
            FROM
                courses c
            WHERE
                c.id = $1;
            `, [courseId]);
            console.log(`Database message: ${JSON.stringify(result)}`);
            await db.end();
            console.log('Disconnected from database');
            httpRequestsTotal.inc({ endpoint: 'courses_id', method: 'GET', status_code: '200'});
            res.json(result?.rows[0]);
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'courses_id', method: 'GET', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    return router;
};