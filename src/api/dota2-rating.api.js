import fetch from 'node-fetch';

const getEnrichedRating = async () => {
  const url = new URL('http://localhost:3000/api/rating/enriched');

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

const updateTeams = async (teams) => {
  const url = new URL('http://localhost:3000/api/teams/');

  const body = JSON.stringify(teams);
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

const setNewTop1Bulk = async (matches) => {
  const url = new URL('http://localhost:3000/api/matches/set-new-top-1-bulk');

  const body = JSON.stringify(matches);
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
  getEnrichedRating,
  updateRating,
  updateTeams,
  getLastAnalyzedDate,
  updateLastAnalyzedDate,
  setNewTop1Bulk,
  getLastMatchEndTime,
  addMatch,
  getMatchesAfterDate,
};
