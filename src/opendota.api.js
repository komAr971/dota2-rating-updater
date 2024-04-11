import fetch from 'node-fetch';

function sleep(seconds) {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const getProMatches = async (lastMatchId = null) => {
  const url = new URL('https://api.opendota.com/api/proMatches');

  if (lastMatchId) {
    url.search = `less_than_match_id=${lastMatchId}`;
  }

  const response = await fetch(url.toString());
  const data = await response.json();

  await sleep(1);

  return data;
};

export { getProMatches };
