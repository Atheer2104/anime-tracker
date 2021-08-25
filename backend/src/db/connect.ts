import mongoose from 'mongoose';
import config from '../../config/config';
import log from '../logger/logger';

function connect() {
    mongoose.connect(config.mongodb.mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        // when using findOneAndUpdate() will give warning about deprections this fixes it
        useFindAndModify: false,
    })
    .then(() => {
        log.info("Connected to mongoDB");
    })
    .catch(error  => {
        log.error("Could not connect to mongoDB", error);
        process.exit(1);
    })
}


export default connect;
