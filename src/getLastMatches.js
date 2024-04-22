import { getProMatches } from './opendota.api.js';
import { getLastMatchEndTime } from './dota2-rating.api.js';

const compareMatches = (match1, match2) => {
  return match1.end_time - match2.end_time;
};

const mapper = (match) => {
  return {
    match_id: match.match_id,
    end_time: (match.start_time + match.duration) * 1000,
    winner_team_id: match.radiant_win ? match.radiant_team_id : match.dire_team_id,
    winner_name: match.radiant_win ? match.radiant_name : match.dire_name,
    looser_team_id: match.radiant_win ? match.dire_team_id : match.radiant_team_id,
    looser_name: match.radiant_win ? match.dire_name : match.radiant_name,
    league_id: match.leagueid,
    league_name: match.league_name,
  };
};

const filter = (match) => {
  return (
    match.match_id &&
    match.radiant_team_id &&
    match.dire_team_id &&
    match.radiant_name &&
    match.dire_name &&
    match.leagueid &&
    match.league_name
  );
};

export default async () => {
  const lastMatchEndTime = new Date(await getLastMatchEndTime()).getTime();

  let sortedMatches = [];
  let lastMatchId = null;
  let matches = [];

  do {
    matches = await getProMatches(lastMatchId);
    const mappedMatches = matches.filter(filter).map(mapper);
    lastMatchId = matches[matches.length - 1].match_id;
    sortedMatches = [...sortedMatches, ...mappedMatches].sort(compareMatches);
  } while (sortedMatches[0].end_time > lastMatchEndTime);

  return sortedMatches.filter((match) => match.end_time > lastMatchEndTime);
};
