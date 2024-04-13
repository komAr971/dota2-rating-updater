import fetch from 'node-fetch';
import getLastMatches from './getLastMatches.js';
import { getLastMatchEndTime, updateLastMatchEndTime } from './dota2-rating.api.js';
import analyzeMatch from './analyzeMatch.js';

const updater = async () => {
  const matches = await getLastMatches();

  for (const match of matches) {
    await analyzeMatch(match);
  }

  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const lastMatchEndTime = lastMatch.end_time * 1000;
    await updateLastMatchEndTime(lastMatchEndTime);
  }
};

await updater();
