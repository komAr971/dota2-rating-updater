import { getProMatches } from './opendota.api.js';
import { getLastMatchEndTime } from './dota2-rating.api.js';

const compareMatches = (match1, match2) => {
  return match1.end_time - match2.end_time;
};

const mapper = (match) => {
  return {
    ...match,
    end_time: match.start_time + match.duration,
  };
};

export default async () => {
  const lastMatchEndTime = new Date(await getLastMatchEndTime()).getTime() / 1000;

  let sortedMatches = [];
  let lastMatchId = null;
  let matches = [];

  do {
    matches = await getProMatches(lastMatchId);
    const mappedMatches = matches.map(mapper);
    lastMatchId = matches[matches.length - 1]?.match_id;
    const lastMatchStartTime = new Date(
      matches[matches.length - 1]?.start_time * 1000,
    );
    console.log(
      `${lastMatchStartTime.toLocaleString('ru-RU')}, lastMatchId = ${lastMatchId}`,
    );
    sortedMatches = [...sortedMatches, ...mappedMatches].sort(compareMatches);
  } while (sortedMatches[0].end_time > lastMatchEndTime && matches.length > 0);

  return sortedMatches.filter((match) => match.end_time > lastMatchEndTime);
};
