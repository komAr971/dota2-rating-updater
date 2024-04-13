import { getTeams, upsertTeam } from './dota2-rating.api.js';
import { getTeamData } from './opendota.api.js';

export default async (match) => {
  const radiantWin = match.radiant_win;
  const winnerTeamId = radiantWin ? match.radiant_team_id : match.dire_team_id;
  const looserTeamId = radiantWin ? match.dire_team_id : match.radiant_team_id;

  const teams = await getTeams();

  if (!teams.some((team) => team.team_id === winnerTeamId)) {
    const winnerData = await getTeamData(winnerTeamId);
    const winner = {
      team_id: winnerTeamId,
      name: winnerData?.name || winnerTeamId,
      rating_place: teams.length + 1,
      last_match_time: winnerData?.last_match_time || match.start_time,
      tag: winnerData?.tag || winnerTeamId,
      logo_url: winnerData?.logo_url || '',
    };
    teams.push(winner);
    await upsertTeam(winner);
  }

  if (!teams.some((team) => team.team_id === looserTeamId)) {
    const looserData = await getTeamData(looserTeamId);
    const looser = {
      team_id: looserTeamId,
      name: looserData?.name || looserTeamId,
      rating_place: teams.length + 1,
      last_match_time: looserData?.last_match_time || match.start_time,
      tag: looserData?.tag || looserTeamId,
      logo_url: looserData?.logo_url || '',
    };
    teams.push(looser);
    await upsertTeam(looser);
  }

  const winner = teams.find((team) => team.team_id === winnerTeamId);
  const looser = teams.find((team) => team.team_id === looserTeamId);

  const winnerRatingPlace = winner.rating_place;
  const looserRatingPlace = looser.rating_place;

  if (winnerRatingPlace > looserRatingPlace) {
    const fallingTeams = teams
      .map((team) => {
        return {
          team_id: team.team_id,
          rating_place: team.rating_place,
        };
      })
      .filter(
        (team) =>
          team.rating_place < winnerRatingPlace &&
          team.rating_place >= looserRatingPlace,
      );

    for (const fallingTeam of fallingTeams) {
      await upsertTeam({
        team_id: fallingTeam.team_id,
        rating_place: fallingTeam.rating_place + 1,
      });
    }

    await upsertTeam({
      team_id: winnerTeamId,
      rating_place: looserRatingPlace,
    });
  }

  const matchTime = new Date(match.start_time * 1000);
  console.log(
    `${matchTime.toLocaleString('ru-RU')} ~ ${match.match_id}: ${winner?.name} > ${
      looser?.name
    }`,
  );
};
