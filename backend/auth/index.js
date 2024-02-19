const express = require('express');
const { createHash } = require('crypto');
const { v4: uuidv4 } = require('uuid');
const pg = require('pg');
const router = express.Router();

module.exports = function (httpRequestsTotal, dbConfig) {
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        console.log(`Username and password: ${username} ${password}`);
        if (!username || !password) {
            httpRequestsTotal.inc({ endpoint: 'login', method: 'POST', status_code: '400'});
            res.status(400).json({error: 'Username and password are required'});
            return;
        }
        const hashedPassword = createHash('sha256').update(password).digest('base64');
        console.log(`Hashed password: ${hashedPassword}`);
        try {
            const db = new pg.Client(dbConfig);
            await db.connect();
            console.log('Connected to database');
            const result = await db.query(`
            SELECT
                u.id,
                u.username,
                u.password,
                r.role_name
            FROM
                users u
            JOIN
                user_roles ur ON u.id = ur.user_id
            JOIN
                roles r ON ur.role_id = r.id
            WHERE
                u.username = $1;
            `, [username]);
            console.log(`Database message: ${JSON.stringify(result)}`);
            if (result.rowCount === 0) {
                httpRequestsTotal.inc({ endpoint: 'login', method: 'POST', status_code: '401'});
                res.status(401).json({error: 'Invalid username'});
                return;
            }
            const user = result?.rows[0];
            await db.end();
            console.log('Disconnected from database');

            if (user.password !== hashedPassword) {
                httpRequestsTotal.inc({ endpoint: 'login', method: 'POST', status_code: '401'});
                res.status(401).json({error: 'Invalid password'});
                return;
            }

            // create session cookie and encode it in base64
            console.log(`Create cookie session`);
            const session = {
                sid: uuidv4(),
                userId: user.id,
                role: user.role_name
            };
            console.log(`New session: ${JSON.stringify(session)}`);
            const sessionString = JSON.stringify(session);
            const sessionEncoded = Buffer.from(sessionString, 'ascii').toString('base64');
            console.log(`New session cookie: ${sessionEncoded}`);

            res.cookie('main_session', sessionEncoded, {
                httpOnly: false, // cookie is not accessible via JavaScript
                secure: true, // https only
                sameSite: 'strict', // cookie is not sent in cross-site requests
                maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
            });
            httpRequestsTotal.inc({ endpoint: 'login', method: 'POST', status_code: '200'});
            res.json({message: 'Login successful' });
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'login', method: 'POST', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    router.get('/logout', async (req, res) => {
        // clear session cookie
        res.clearCookie('main_session');
        httpRequestsTotal.inc({ endpoint: 'logout', method: 'GET', status_code: '200'});
        res.json({message: 'Logout successful'});
    })

    router.post('/register', async (req, res) => {
        const { username, password } = req.body;
        console.log(`Username and password: ${username} ${password}`);
        if (!username || !password) {
            httpRequestsTotal.inc({ endpoint: 'register', method: 'POST', status_code: '400'});
            res.status(400).json({error: 'Username, password are required'});
            return;
        }
        const hashedPassword = createHash('sha256').update(password).digest('base64');
        console.log(`Hashed password: ${hashedPassword}`);
        try {
            const db = new pg.Client(dbConfig);
            await db.connect();
            console.log('Connected to database');
            const result = await db.query(`
            INSERT INTO
                users (username, password)
            VALUES
                ($1, $2)
            RETURNING
                id;
            `, [username, hashedPassword]);
            console.log(`Database message: ${JSON.stringify(result)}`);
            const userId = result?.rows[0]?.id;
            if (!userId) {
                httpRequestsTotal.inc({ endpoint: 'register', method: 'POST', status_code: '500'});
                res.status(500).json({error: 'Internal server error'});
                return;
            }
            await db.query(`
            INSERT INTO
                user_roles (user_id, role_id)
            VALUES
                ($1, 2);
            `, [userId]);
            console.log(`Database message: ${JSON.stringify(result)}`);
            await db.end();
            console.log('Disconnected from database');
            httpRequestsTotal.inc({ endpoint: 'register', method: 'POST', status_code: '200'});
            res.json({message: 'Registration successful'});
        } catch (err) {
            console.error(err);
            httpRequestsTotal.inc({ endpoint: 'register', method: 'POST', status_code: '500'});
            res.status(500).json({error: 'Internal server error'});
        }
    })

    return router;
};