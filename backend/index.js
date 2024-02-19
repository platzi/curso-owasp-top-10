const express = require('express');
const cookieParser = require('cookie-parser');
const Prometheus = require('prom-client');
const promBundle = require("express-prom-bundle");
const axios = require('axios');

const app = express();

const auth = require('./auth');
const users = require('./users');
const courses = require('./courses');
const authors = require('./authors');

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const toJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {project_name: 'webapp', project_type: 'test_metrics_labels'},
  promClient: {
      collectDefaultMetrics: {}
  }
});

const metricsAuthMiddleware = (req, res, next) => {
  if (req.headers['authorization']?.includes('Basic')) {
    const token = req.headers['authorization'].split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    if (username === process.env.METRICS_USER && password === process.env.METRICS_PASSWORD) {
      next();
    } else {
      console.log('Unauthorized: Invalid credentials');
      res.status(401).send('Unauthorized');
    }
  } else {
    console.log('Unauthorized: No credentials');
    res.status(401).send('Unauthorized');
  }
};

app.use('/metrics', metricsAuthMiddleware);

app.use(metricsMiddleware);

const httpRequestsTotal = new Prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['endpoint', 'method', 'status_code'],
});

const isPublicPath = (path) => {
  console.log(`path: ${path}`);
  return path === '/login' || path == '/logout' || path === '/metrics' || path === '/' || path.includes('/courses') || path.includes('/authors');
}

// auth middleware
app.use((req, res, next) => {
  const cookieString = req.cookies['main_session'] || '';
  const cookieValue = Buffer.from(cookieString, 'base64').toString('ascii');
  const session = toJSON(cookieValue);
  console.log(`cookie session: ${JSON.stringify(session)}`);
  if (session?.userId || isPublicPath(req.path)) {
    req.session = session;
    next();
    return;
  }
  res.status(401).json({error: 'Unauthorized'});
});

app.get('/', (req, res) => {
  httpRequestsTotal.inc({ endpoint: 'home', method: 'GET', status_code: '200'});
  res.send('Welcome to the learning platform');
});

app.use('/', auth(httpRequestsTotal, dbConfig));
app.use('/users', users(httpRequestsTotal, dbConfig));
app.use('/courses', courses(httpRequestsTotal, dbConfig));
app.use('/authors', authors(httpRequestsTotal, dbConfig));

app.listen(8080, async () => {
  console.log('WebApp Server is up and running');
});
