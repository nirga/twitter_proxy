import fetch from "node-fetch";

const handler = async (event, context) => {
  const twitterRes = await fetch(
    `https://api.twitter.com/2/tweets?ids=${event.queryStringParameters.tweet}&tweet.fields=text`,
    {
      headers: { Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}` },
    }
  );
  const twitterResJson = await twitterRes.json();

  console.log();

  return {
    statusCode: 200,
    body: twitterResJson.data[0].text.includes(
      event.queryStringParameters.challenge
    )
      ? JSON.stringify({ data: "1" })
      : JSON.stringify({ data: "1" }),
  };
};

export { handler };
