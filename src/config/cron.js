import cron from "cron";
import https from "https";


const SERVER_URL = process.env.RENDER_SERVER_URL;

// Cron Job runs every 10 minutes
const renderServerCronJob = new cron.CronJob("*/10 * * * *", () => {
    https.get(SERVER_URL, (res) => {
        if (res.statusCode === 200) {
            console.log("GET Request sent successfully!");
        } else {
            console.log("GET Request failed", res.statusCode);
        }
    }).on("error", (e) => {
        console.error("Error while sending request!");
    })
});

export default renderServerCronJob;
