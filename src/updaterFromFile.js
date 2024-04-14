import getLastMatchesFromFile from './getLastMatchesFromFile.js';
import { getTeams } from './dota2-rating.api.js';
import analyzeMatch from './analyzeMatch.js';
import updateTeams from './updateTeams.js';

const updater = async () => {
  const matches = getLastMatchesFromFile();

  for (const match of matches) {
    const teams = await getTeams();
    const teamsToUpdate = analyzeMatch(match, teams);
    await updateTeams(teamsToUpdate);
  }

  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const lastMatchEndTime = lastMatch.end_time * 1000;
    await updateLastMatchEndTime(lastMatchEndTime);
  }
};

await updater();