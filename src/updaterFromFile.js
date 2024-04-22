import getLastMatchesFromFile from './getLastMatchesFromFile.js';
import analyzeMatch from './analyzeMatch.js';
import { addMatch, getLastMatchEndTime } from './dota2-rating.api.js';
import getLastMatches from './getLastMatches.js';

const updater = async () => {
  const matches = await getLastMatches();

  console.log(matches);
};

await updater();
