import express from 'express';
import config from '../config/config'
import connect from './db/connect';
import log from './logger/logger';
import routes from './routes';
import { deserializeUser } from './middleware/deserializeUser';
import session from 'express-session';

const app = express();
const port = Number(config.server.port);
const hostname = config.server.hostname;

app.use(deserializeUser);
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    cookie: { maxAge: oneDay }
}));

// ! this is so anyone one can acess our page this will ned to be chnaged in production.
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-refresh, authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

app.listen(port, hostname, () => {
    log.info(`Server listening at http://${hostname}:${port}`);

    connect();

    routes(app);
})
