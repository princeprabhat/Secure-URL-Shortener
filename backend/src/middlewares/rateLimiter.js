import { rateLimit } from 'express-rate-limit';
import httpStatus from 'http-status';


const checkIpLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    message: {
        status: httpStatus.TOO_MANY_REQUESTS,
        error: 'Request limit has exceeded. Please try again after 1 hour.',
    },
    standardHeaders: 'draft-7',
    legacyHeaders: false,

})

export default checkIpLimit;