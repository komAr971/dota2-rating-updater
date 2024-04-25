import {
  getLastAnalyzedDate,
  getMatchesAfterDate,
  getEnrichedRating,
  updateTeam,
  setNewTop1,
  updateRating,
} from './api/dota2-rating.api.js';

const compareMatches = (match1, match2) => {
  return match1.end_time - match2.end_time;
};

const analyzeMatches = async () => {
  const lastAnalyzedDate = await getLastAnalyzedDate();
  const matches = await getMatchesAfterDate(lastAnalyzedDate);
  const sortedMatches = matches.sort(compareMatches);

  const enrichedrating = await getEnrichedRating();
  const rating = enrichedrating.map(({ team_id }) => team_id);
  const lastMatchTime = enrichedrating.reduce(
    (acc, { team_id, last_match_time }) => {
      acc[team_id] = last_match_time;
      return acc;
    },
    {},
  );

  let currentDay = new Date(sortedMatches[0].end_time).getDay();

  for (const match of sortedMatches) {
    const matchDay = new Date(match.end_time).getDay();
    if (currentDay !== matchDay) {
      currentDay = matchDay;
      const sixMonthsAgo = new Date(match.end_time);
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      for (let i = 0; i < rating.length; i += 1) {
        const team_id = rating[i];
        const lastMatchEndTime = new Date(lastMatchTime[team_id]);
        if (lastMatchEndTime < sixMonthsAgo) {
          rating.splice(i, 1);
          console.log(`${team_id} was inactive`);
        }
      }
    }

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

    lastMatchTime[winner.team_id] = winner.last_match_time;
    lastMatchTime[looser.team_id] = looser.last_match_time;

    if (!rating.includes(winner.team_id)) {
      rating.push(winner.team_id);
      await updateTeam(winner);
    }
    if (!rating.includes(looser.team_id)) {
      rating.push(looser.team_id);
      await updateTeam(looser);
    }

    const winnerRatingPlace = rating.indexOf(winner.team_id);
    const looserRatingPlace = rating.indexOf(looser.team_id);

    if (winnerRatingPlace > looserRatingPlace) {
      rating.splice(winnerRatingPlace, 1);
      rating.splice(looserRatingPlace, 0, winner.team_id);
    }

    if (looserRatingPlace === 0) {
      await setNewTop1(match.match_id);
    }

    console.log(`${match.end_time}: ${winner.team_id} > ${looser.team_id}`);
  }

  await updateRating(rating);
};

await analyzeMatches();
