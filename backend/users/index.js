const express = require('express');
const pg = require('pg');
const router = express.Router();

module.exports = function (httpRequestsTotal, dbConfig) {
    router.get('/', async (req, res) => {

        if (req.session?.role !== 'admin') {
            httpRequestsTotal.inc({ endpoint: 'users', method: 'GET', status_code: '401'});
            res.status(401).json({error: 'Unauthorized'});
            return;
        }

        const db = new pg.Client(dbConfig);
        try {
            await db.connect();
            console.log('Connected to database');
            const users = await db.query(`
            SELECT
                u.id,
                u.username,
                p.bio,
                p.first_name,
                p.last_name,
                p.email,
                p.phone,
                p.website,
                r.role_name
            FROM 
                users u
            JOIN 
                profiles p ON u.id = p.user_id
            JOIN 
                user_roles ur ON u.id = ur.user_id
            JOIN 
                roles r ON ur.role_id = r.id;
            `);
            console.log(`Database message: ${JSON.stringify(users)}`);
            
            await db.end();
            console.log('Disconnected from database');
            httpRequestsTotal.inc({ endpoint: 'users', method: 'GET', status_code: '200'});
            res.json(users?.rows);
            return;
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'users', method: 'GET', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    router.get('/:id', async (req, res) => {
        const db = new pg.Client(dbConfig);
        try {
            await db.connect();
            const userId = parseInt(req.params.id);
            console.log(`User id: ${userId}`);
            const user = await db.query(`
            SELECT
                u.id,
                u.username,
                p.bio,
                p.first_name,
                p.last_name,
                p.email,
                p.phone,
                p.website,
                r.role_name
            FROM 
                users u
            JOIN 
                profiles p ON u.id = p.user_id
            JOIN 
                user_roles ur ON u.id = ur.user_id
            JOIN 
                roles r ON ur.role_id = r.id
            WHERE
                u.id = $1;
            `, [userId]);
            console.log(`Database message: ${JSON.stringify(user)}`);
            await db.end();
            console.log('Disconnected from database');
            httpRequestsTotal.inc({ endpoint: 'users_id', method: 'GET', status_code: '200'});
            res.json(user?.rows[0]);
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'users_id', method: 'GET', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    router.post('/:id', async (req, res) => {
        try {
            const db = new pg.Client(dbConfig);
            await db.connect();
            const userId = parseInt(req.params.id);
            console.log(`User id: ${userId}`);

            const { bio, username, first_name, last_name, email, phone, website } = req.body;
            console.log(`User: ${bio} ${username} ${first_name} ${last_name} ${email} ${phone} ${website}`);

            const user = await db.query(`
            UPDATE
                users u
            SET
                username = '${username}'
            WHERE
                u.id = ${userId};
            `);
            console.log(`User rows: ${JSON.stringify(user)}`);

            const profile = await db.query(`
            UPDATE
                profiles p
            SET
                bio = $1,
                first_name = $2,
                last_name = $3,
                email = $4,
                phone = $5,
                website = $6
            WHERE
                p.user_id = $7;
            `, [bio, first_name, last_name, email, phone, website, userId]);
            console.log(`Database message: ${JSON.stringify(profile)}`);

            await db.end();
            console.log('Disconnected from database');

            httpRequestsTotal.inc({ endpoint: 'users_id', method: 'POST', status_code: '200'});
            res.json({ message: 'User updated' });
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'users_id', method: 'POST', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    });

    router.get('/:id/payments', async (req, res) => {
        const db = new pg.Client(dbConfig);
        try {
            await db.connect();
            const userId = parseInt(req.params.id);
            console.log(`User id: ${userId}`);
            const payments = await db.query(`
            SELECT
                p.id,
                p.amount,
                p.date,
                p.description
            FROM 
                payments p
            WHERE
                p.user_id = $1;
            `, [userId]);
            console.log(`Database message: ${JSON.stringify(payments)}`);
            await db.end();
            console.log('Disconnected from database');
            httpRequestsTotal.inc({ endpoint: 'users_id_payments', method: 'GET', status_code: '200'});
            res.json(payments?.rows);
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'users_id_payments', method: 'GET', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    router.post('/:id/payments', async (req, res) => {
        try {
            const db = new pg.Client(dbConfig);
            await db.connect();
            const userId = parseInt(req.params.id);
            console.log(`User id: ${userId}`);
            const { amount, date, description } = req.body;
            console.log(`Payment: ${amount} ${date} ${description}`);
            const result = await db.query(`
            INSERT INTO
                payments (user_id, amount, date, description)
            VALUES
                ($1, $2, $3, $4);
            `, [userId, amount, date, description]);
            console.log(`Database message: ${JSON.stringify(result)}`);
            await db.end();
            httpRequestsTotal.inc({ endpoint: 'users_id_payments', method: 'POST', status_code: '200'});
            console.log('Disconnected from database');
            res.json({message: 'Payment added'});
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'users_id_payments', method: 'POST', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    router.get('/:id/courses', async (req, res) => {
        const db = new pg.Client(dbConfig);
        try {
            await db.connect();
            const userId = parseInt(req.params.id);
            console.log(`User id: ${userId}`);
            const courses = await db.query(`
            SELECT
                c.id,
                c.course_name,
                c.course_description,
                c.course_code
            FROM 
                courses c
            JOIN 
                user_courses cu ON c.id = cu.course_id
            WHERE
                cu.user_id = $1;
            `, [userId]);
            console.log(`Database message: ${JSON.stringify(courses)}`);
            await db.end();
            console.log('Disconnected from database');
            httpRequestsTotal.inc({ endpoint: 'users_id_courses', method: 'GET', status_code: '200'});
            res.json(courses?.rows);
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'users_id_courses', method: 'GET', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    return router;
};