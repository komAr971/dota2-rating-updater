import fetch from 'node-fetch';

function sleep(seconds) {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const getProMatches = async (lastMatchId = null) => {
  try {
    await sleep(1.1);

    const url = new URL('https://api.opendota.com/api/proMatches');

    if (lastMatchId) {
      url.search = `less_than_match_id=${lastMatchId}`;
    }

    const response = await fetch(url.toString());
    return await response.json();
  } catch (error) {}
};

const getTeamData = async (teamId) => {
  try {
    await sleep(1.1);

    const url = new URL(teamId, 'https://api.opendota.com/api/teams/');

    const response = await fetch(url.toString());
    return await response.json();
  } catch (error) {}
};

export { getProMatches, getTeamData };
