import getLastMatches from './getLastMatches.js';
import { getTeams, updateLastMatchEndTime } from './dota2-rating.api.js';
import analyzeMatch from './analyzeMatch.js';
import updateTeams from './updateTeams.js';

const updater = async () => {
  const matches = await getLastMatches();

  for (const match of matches) {
    const teams = await getTeams();
    const { teamsToUpdate, firstPlace } = analyzeMatch(match, teams);
    await updateTeams(teamsToUpdate);
    await addFirstPlace(firstPlace);
  }

  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const lastMatchEndTime = lastMatch.end_time * 1000;
    await updateLastMatchEndTime(lastMatchEndTime);
  }
};

await updater();
