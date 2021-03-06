import  express from 'express';
require('dotenv').config();
import config from 'config'
import logger from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";


const port = config.get<number>('port');

const app = express();

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
    logger.info(`App is running at http://localhos:${port}`);

    await connect();

    routes(app);
});