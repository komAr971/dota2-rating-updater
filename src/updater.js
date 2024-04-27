import analyzeMatches from './analyzeMatches.js';
import updateMatches from './updateMatches.js';

const updater = async () => {
  await updateMatches();
  await analyzeMatches();
};

await updater();
