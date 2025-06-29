import catchAsync from "../utils/catchAsync.js";
import { urlService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from 'http-status';
import config from "../config/config.js";

const getUrlAnalytics = catchAsync(async (req, res) => {
    const { shortCode } = req.params;

    const result = await urlService.getUrlDataByShortCode(shortCode);

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Short code does not exist");
    }
    const shortUrl = `${config.baseUrl}/${result.short_code}`;

    res.status(httpStatus.OK).json({
        message: "Data fetched successfully",
        data: {
            ...result,
            short_url: shortUrl
        }
    });

});


export default {
    getUrlAnalytics
}