import fetch from 'node-fetch';

const getLastMatchEndTime = async () => {
  const url = new URL('http://localhost:3000/api/lastMatchEndTime');

  const response = await fetch(url.toString());
  const data = await response.json();
  const lastMatchEndTime = data.last_match_end_time;

  return lastMatchEndTime;
};

const updateLastMatchEndTime = async (lastMatchEndTime) => {
  const url = new URL('http://localhost:3000/api/lastMatchEndTime');

  const body = JSON.stringify({ last_match_end_time: lastMatchEndTime });
  await fetch(url.toString(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getTeams = async () => {
  const url = new URL('http://localhost:3000/api/teams');

  const response = await fetch(url.toString());
  return await response.json();
};

const upsertTeam = async (team) => {
  const url = new URL('http://localhost:3000/api/teams/');

  const body = JSON.stringify(team);
  const response = await fetch(url.toString(), {
    method: 'PUT',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const addFirstPlace = async (firstPlace) => {
  const url = new URL('http://localhost:3000/api/firstPlaces');

  const body = JSON.stringify(firstPlace);
  const response = await fetch(url.toString(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export {
  getLastMatchEndTime,
  updateLastMatchEndTime,
  getTeams,
  upsertTeam,
  addFirstPlace,
};
