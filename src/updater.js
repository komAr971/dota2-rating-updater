import fetch from 'node-fetch';
import getLastMatches from './getLastMatches.js';
import { getLastMatchEndTime } from './dota2-rating.api.js';

const updater = async () => {
  const matches = await getLastMatches();
  console.log(matches);
};

await updater();
