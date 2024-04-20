import * as fs from 'fs';

const filter = (match) => {
  return (
    match.radiant_team_id &&
    match.dire_team_id &&
    match.radiant_name &&
    match.dire_name
  );
};

const edit = () => {
  const matchesFromFile = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));
  const matches = matchesFromFile.filter(filter);
  fs.writeFileSync('./data/matches_1.json', JSON.stringify(matches, null, '  '));
};

edit();
