import {
  deleteInactiveMatches,
  deleteTeams,
  unsetNewTop1,
  updateLastAnalyzedDate,
  updateRating,
} from './api/dota2-rating.api.js';

const resetRating = async () => {
  console.log('Resetting rating');
  await updateRating([]);

  console.log('Resetting last analyzed date');
  const date = new Date(1272631578000);
  await updateLastAnalyzedDate(date);

  console.log('Unset top 1 matches');
  const unsetRes = await unsetNewTop1();
  console.log(unsetRes);

  console.log('Delete inactive matches');
  const inactiveRes = await deleteInactiveMatches();
  console.log(inactiveRes);

  console.log('Deleting teams');
  const deleteRes = await deleteTeams();
  console.log(deleteRes);
};

await resetRating();
