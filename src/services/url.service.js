
import pool from "../config/db.js";
import { customAlphabet } from 'nanoid'

//  Generate a new short_code
const generateUrl = async (urlData) => {

    // If Url existed return the short_code
    const existingUrl = await pool.query(
        'SELECT * FROM urls WHERE original_url = $1', [urlData.original_url]
    )

    if (existingUrl.rows.length > 0) {

        return { ...existingUrl.rows[0], isNew: false };
    }

    // Create short_code for new Url request
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);

    const shortCode = nanoid();

    const result = await pool.query(
        'INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *',
        [urlData.original_url, shortCode]
    );

    return { ...result.rows[0], isNew: true };


};

//  Getting url data for redirect and analytics controller
const getUrlDataByShortCode = async (shortCode) => {
    const urlData = await pool.query(
        'SELECT * FROM urls WHERE short_code = $1', [shortCode]
    );

    return urlData.rows[0];

};

//  Increment clicks for redirect controller
const incrementClick = async (shortCode) => {
    await pool.query(
        'UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1',
        [shortCode]
    );
};

export default {
    generateUrl,
    getUrlDataByShortCode,
    incrementClick
}