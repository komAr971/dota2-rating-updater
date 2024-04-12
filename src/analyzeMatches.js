import { getTeams, upsertTeam } from './dota2-rating.api.js';

const analyzeMatch = async (match) => {
  const teams = await getTeams();
  console.log(teams);
};

export default async (matches) => {
  for (const match of matches) {
    await analyzeMatch(match);
    break;
  }
};
