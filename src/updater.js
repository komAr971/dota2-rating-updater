import fetch from 'node-fetch';
import getLastMatches from './getLastMatches.js';
import { getLastMatchEndTime, updateLastMatchEndTime } from './dota2-rating.api.js';
import analyzeMatches from './analyzeMatches.js';

const updater = async () => {
  const matches = await getLastMatches();

  await analyzeMatches(matches);

  // const lastMatchEndTime = new Date(await getLastMatchEndTime()).getTime() / 1000;
  // console.log(lastMatchEndTime);

  // const newLastMatchEndTime = new Date(1712943766 * 1000);
  // await updateLastMatchEndTime(newLastMatchEndTime);
};

await updater();
