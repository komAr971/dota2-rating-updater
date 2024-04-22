import exceptions from '../data/exceptions.js';
import {
  addFirstPlace,
  addMatch,
  addTeam,
  getTeam,
  updateTeam,
} from './api/dota2-rating.api.js';

export default async (match) => {
  await addMatch(match);

  const winner = {
    team_id: match.winner_team_id,
    name: match.winner_name,
    last_match_time: match.end_time,
  };
  const looser = {
    team_id: match.looser_team_id,
    name: match.looser_name,
    last_match_time: match.end_time,
  };

  if (exceptions[winner.team_id]) {
    winner.team_id = exceptions[winner.team_id];
  }
  if (exceptions[looser.team_id]) {
    looser.team_id = exceptions[looser.team_id];
  }

  const foundWinner = await getTeam(winner.team_id);
  const foundLooser = await getTeam(looser.team_id);

  if (!foundWinner && !foundLooser) {
    await addTeam(winner);
    await addTeam(looser);
  } else if (!foundLooser) {
    await addTeam(looser);
  } else if (!foundWinner) {
    winner.rating_place = foundLooser.rating_place;
    await addTeam(winner);
  } else if (foundWinner.rating_place > foundLooser.rating_place) {
    winner.rating_place = foundLooser.rating_place;
    await updateTeam(winner);
  }

  if (winner.rating_place === 1 && foundLooser.rating_place === 1) {
    const firstPlace = {
      team_id: winner.team_id,
      name: winner.name,
      match_time: match.end_time,
      league_id: match.league_id,
      league_name: match.league_name,
    };
    await addFirstPlace(firstPlace);
  }

  const matchTime = new Date(match.end_time);
  console.log(
    `${matchTime.toLocaleString('ru-RU')} ~ ${match.league_name} ~ ${
      match.match_id
    } ${winner.name} > ${looser.name} `,
  );
};
