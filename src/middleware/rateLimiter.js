import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        // apply the userId or IP address as the unique identifier for the current user rather "my-rate-limit"
        const { success } = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({message: "Too many requests!, please try again later!"})
        }

        next()
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter;