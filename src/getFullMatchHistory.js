import { getProMatches } from './opendota.api.js';
import * as fs from 'fs';

const getFullMatchHistory = async () => {
  let lastMatchId = 7540116814;

  while (true) {
    const matches = await getProMatches(lastMatchId);
    if (!Array.isArray(matches) || matches.length === 0) {
      console.log(matches);
      break;
    }
    const lastMatch = matches[matches.length - 1];
    const lastMatchStartTime = new Date(lastMatch.start_time * 1000);
    console.log(`${lastMatchStartTime.toLocaleString('ru-RU')}`);
    lastMatchId = matches[matches.length - 1].match_id;
    const matchesInFile = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));
    const jsonMatches = JSON.stringify([...matchesInFile, ...matches], null, null);
    fs.writeFileSync('./data/matches.json', jsonMatches);
  }
};

getFullMatchHistory();
