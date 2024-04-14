export default (match, teams) => {
  const teamsToUpdate = [];

  const winner = {
    team_id: match.radiant_win ? match.radiant_team_id : match.dire_team_id,
    name: match.radiant_win ? match.radiant_name : match.dire_name,
    last_match_time: match.start_time * 1000,
  };
  const looser = {
    team_id: match.radiant_win ? match.dire_team_id : match.radiant_team_id,
    name: match.radiant_win ? match.dire_name : match.radiant_name,
    last_match_time: match.start_time * 1000,
  };

  ///exception for Orange E-Sports
  if (winner.team_id === 42) {
    winner.team_id = 416900;
  }
  if (looser.team_id === 42) {
    looser.team_id = 416900;
  }

  const foundWinner = teams.find(({ team_id }) => team_id === winner.team_id);
  const foundLooser = teams.find(({ team_id }) => team_id === looser.team_id);

  if (foundWinner) {
    winner.rating_place = foundWinner.rating_place;
  } else {
    winner.rating_place = teams.length + 1;
    teams.push(winner);
    teamsToUpdate.push(winner);
  }

  if (foundLooser) {
    looser.rating_place = foundLooser.rating_place;
  } else {
    looser.rating_place = teams.length + 1;
    teams.push(looser);
    teamsToUpdate.push(looser);
  }

  if (winner.rating_place > looser.rating_place) {
    const fallingTeams = teams
      .filter(
        (team) =>
          team.rating_place < winner.rating_place &&
          team.rating_place > looser.rating_place,
      )
      .map((team) => {
        return {
          ...team,
          rating_place: team.rating_place + 1,
        };
      });

    winner.rating_place = looser.rating_place;
    winner.last_match_time = match.start_time * 1000;
    teamsToUpdate.push(winner);

    looser.rating_place = looser.rating_place + 1;
    looser.last_match_time = match.start_time * 1000;
    teamsToUpdate.push(looser);

    teamsToUpdate.push(...fallingTeams);
  }

  const matchTime = new Date(match.start_time * 1000);
  console.log(
    `${matchTime.toLocaleString('ru-RU')} ~ ${match.match_id}: ${winner.name} > ${
      looser.name
    }`,
  );

  return teamsToUpdate;
};
