import * as fs from 'fs';

const compareMatches = (match1, match2) => {
  return match1.end_time - match2.end_time;
};

const mapper = (match) => {
  return {
    ...match,
    end_time: match.start_time + match.duration,
  };
};

const filter = (match) => {
  return (
    match.radiant_team_id &&
    match.dire_team_id &&
    match.radiant_name &&
    match.dire_name
  );
};

export default () => {
  const matchesFromFile = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));
  const matches = matchesFromFile.map(mapper).sort(compareMatches).filter(filter);

  return matches;
};
