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

export { getLastMatchEndTime, updateLastMatchEndTime };
