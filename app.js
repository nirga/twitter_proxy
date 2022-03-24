import express, { Router } from "express";
import { join } from "path";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const router = Router();
router.get("/tweet/:id", async (req, res) => {
  const twitterRes = await fetch(
    `https://api.twitter.com/2/tweets?ids=${req.params.id}&tweet.fields=text`,
    {
      headers: { Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}` },
    }
  );
  const twitterResJson = await twitterRes.json();
  res.json({ data: twitterResJson.data[0].text });
});

app.use("/.netlify/functions/server", router); // path must route to lambda

export default app;
export const handler = serverless(app);
