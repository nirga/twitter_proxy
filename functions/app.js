import fetch from "node-fetch";

const handler = async (event, context) => {
  const twitterRes = await fetch(
    `https://api.twitter.com/2/tweets?ids=${event.queryStringParameters.tweet}&tweet.fields=text&expansions=author_id&user.fields=username`,
    {
      headers: { Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}` },
    }
  );
  const twitterResJson = await twitterRes.json();

  console.log();

  const isValid =
    event.queryStringParameters.username ===
      twitterResJson.includes.users[0].username &&
    twitterResJson.data[0].text.includes(event.queryStringParameters.challenge);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: isValid ? "1" : "0" }),
  };
};

export { handler };
