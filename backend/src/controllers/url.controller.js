import catchAsync from "../utils/catchAsync.js";
import { urlService } from "../services/index.js";
import httpStatus from 'http-status';
import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";


const createUrl = catchAsync(async (req, res) => {
    const { originalUrl } = req.body;
    const result = await urlService.generateUrl({ original_url: originalUrl });

    const message = result.isNew ? 'Short URL created successfully' : 'Short URL already exists';

    const shortUrl = `${config.baseUrl}/${result.short_code}`;

    const { isNew, ...modifiedResult } = result;

    return res.status(result.isNew ? httpStatus.CREATED : httpStatus.OK).json({
        message,
        data: {
            ...modifiedResult,
            short_url: shortUrl
        }
    });

});

const redirectUrl = catchAsync(async (req, res) => {
    const { shortCode } = req.params;
    const result = await urlService.getUrlDataByShortCode(shortCode);

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Short URL does not exist');
    }
    await urlService.incrementClick(shortCode);
    res.redirect(result.original_url);
})


export default {
    createUrl,
    redirectUrl
}