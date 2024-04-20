import getLastMatchesFromFile from './getLastMatchesFromFile.js';
import analyzeMatch from './analyzeMatch.js';
import {
  addFirstPlace,
  deleteInactiveTeams,
  getTeams,
  updateLastMatchEndTime,
} from './dota2-rating.api.js';

const updater = async () => {
  const matches = getLastMatchesFromFile();

  const firstPlace = {
    team_id: matches[0].radiant_team_id,
    name: matches[0].radiant_name,
    match_time: matches[0].start_time,
    league_id: matches[0].leagueid,
    league_name: matches[0].league_name,
  };
  await addFirstPlace(firstPlace);

  let prevDate = new Date(matches[0].start_time * 1000);
  for (const match of matches) {
    await analyzeMatch(match);

    const currentDate = new Date(match.start_time * 1000);
    if (prevDate.getDay() !== currentDate.getDay()) {
      const result = await deleteInactiveTeams({
        date: currentDate,
      });
      console.log(result.message);
    }
    prevDate = currentDate;
  }

  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const lastMatchEndTime = lastMatch.end_time * 1000;
    await updateLastMatchEndTime(lastMatchEndTime);
  }
};

await updater();
