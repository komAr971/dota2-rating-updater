import fetch from 'node-fetch';

const getRating = async () => {
  const url = new URL('http://localhost:3000/api/rating');

  const response = await fetch(url.toString());
  return await response.json();
};

const updateRating = async (rating) => {
  const url = new URL('http://localhost:3000/api/rating');

  const body = JSON.stringify({
    rating: rating,
  });
  const response = await fetch(url.toString(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const updateTeam = async (team) => {
  const url = new URL('http://localhost:3000/api/teams/');

  const body = JSON.stringify(team);
  const response = await fetch(url.toString(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const getLastAnalyzedDate = async () => {
  const url = new URL('http://localhost:3000/api/last-analyzed-date/');

  const response = await fetch(url.toString());
  const data = await response.json();
  return new Date(data.last_analyzed_date);
};

const updateLastAnalyzedDate = async (date) => {
  const url = new URL('http://localhost:3000/api/last-analyzed-date/');

  const body = JSON.stringify({
    last_analyzed_date: date,
  });
  const response = await fetch(url.toString(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const setNewTop1 = async (match_id) => {
  const url = new URL('http://localhost:3000/api/matches/set-new-top-1');

  const body = JSON.stringify({
    match_id: match_id,
  });
  const response = await fetch(url.toString(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const getLastMatchEndTime = async () => {
  const url = new URL('http://localhost:3000/api/matches/last-end-time');

  const response = await fetch(url.toString());
  const data = await response.json();
  return new Date(data.last_match_end_time);
};

const addMatch = async (match) => {
  const url = new URL('http://localhost:3000/api/matches/');

  const body = JSON.stringify(match);
  const response = await fetch(url.toString(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const getMatchesAfterDate = async (date) => {
  const url = new URL(date.valueOf(), 'http://localhost:3000/api/matches/after/');

  const response = await fetch(url.toString());
  return await response.json();
};

export {
  getRating,
  updateRating,
  updateTeam,
  getLastAnalyzedDate,
  updateLastAnalyzedDate,
  setNewTop1,
  getLastMatchEndTime,
  addMatch,
  getMatchesAfterDate,
};
