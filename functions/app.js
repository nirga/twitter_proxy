import fetch from "node-fetch";

const handler = async (event, context) => {
  const twitterRes = await fetch(
    `https://api.twitter.com/2/tweets?ids=${event.queryStringParameters.tweet}&tweet.fields=text`,
    {
      headers: { Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}` },
    }
  );
  const twitterResJson = await twitterRes.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ data: twitterResJson.data[0].text }),
  };
};

export { handler };
