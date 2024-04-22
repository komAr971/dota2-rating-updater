import getLastMatches from './getLastMatches.js';
import analyzeMatch from './analyzeMatch.js';
import { addMatch } from './dota2-rating.api.js';

const updater = async () => {
  const matches = await getLastMatches();

  for (const match of matches) {
    await addMatch(match);
    await analyzeMatch(match);
  }
};

await updater();
