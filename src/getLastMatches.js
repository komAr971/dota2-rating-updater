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
  console.log(lastMatchEndTime);

  let sortedMatches = [];
  let lastMatchId = null;

  do {
    const matches = await getProMatches(lastMatchId);
    const mappedMatches = matches.map(mapper);
    lastMatchId = matches[matches.length - 1].match_id;
    sortedMatches = [...sortedMatches, ...mappedMatches].sort(compareMatches);
    //console.log(sortedMatches);
    //console.log('был запрос матчей');
    //console.log(sortedMatches[0].end_time);
  } while (sortedMatches[0].end_time > lastMatchEndTime);

  return sortedMatches.filter((match) => match.end_time > lastMatchEndTime);
};
