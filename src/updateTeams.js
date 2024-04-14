import { upsertTeam } from './dota2-rating.api.js';

export default async (teamsToUpdate) => {
  for (const team of teamsToUpdate) {
    await upsertTeam(team);
  }
};
