import express from 'express';
import config from '../config/config'
import log from './logger/logger';

const app = express();
const port = Number(config.server.port);
const hostname = config.server.hostname;

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.listen(port, hostname, () => {
    log.info(`Server listening at http://${hostname}:${port}`);
})
