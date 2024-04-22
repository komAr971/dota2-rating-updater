import {
  addMatch,
  getLastAnalyzedDate,
  getLastMatchEndTime,
  getMatchesAfterDate,
  getRating,
  setNewTop1,
  updateLastAnalyzedDate,
  updateRating,
  updateTeam,
} from './api/dota2-rating.api.js';

const updater = async () => {
  const date = new Date(1271948591000);
  const res = await getMatchesAfterDate(date);
  console.log(res.slice(0, 5));
};

await updater();
