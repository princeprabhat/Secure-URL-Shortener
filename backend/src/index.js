import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import ApiError from "./utils/ApiError.js";
import httpStatus from 'http-status';
import { errorHandler } from "./middlewares/error.js";
import apiRoutes from './routes/index.js';
import redirectRoute from './routes/redirect.route.js';



const app = express();


app.use(helmet());
app.use(express.json());


app.use(cors());
app.options('*', cors());

app.use('/api', apiRoutes);
app.use('/', redirectRoute);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not a valid request"))
});

app.use(errorHandler);

export default app;