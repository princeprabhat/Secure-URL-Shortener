import app from "./index.js";
import config from "./config/config.js";
import pool from "./config/db.js";
import { createTableQuery } from "./config/db.js";



pool.connect().then(async client => {
    console.log("PostgresSQL DB connected");
    await client.query(createTableQuery);
    console.log("table url created");
    client.release();

    app.listen(config.port, () => {
        console.log("server listening on port: ", config.port);
    })

}).catch((err) => {
    console.error("Database connection failed: ", err);
    process.exit(1);
})

