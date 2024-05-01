import {
  getLastAnalyzedDate,
  getMatchesAfterDate,
  getEnrichedRating,
  updateTeams,
  setNewTop1Bulk,
  updateRating,
  updateLastAnalyzedDate,
  addMatch,
} from './api/dota2-rating.api.js';
import exceptions from '../data/exceptions.js';

const compareMatches = (match1, match2) => {
  const match1EndTime = new Date(match1.end_time);
  const match2EndTime = new Date(match2.end_time);
  return match1EndTime - match2EndTime;
};

const analyzeMatches = async () => {
  console.log('getting last analyzed date');
  const lastAnalyzedDate = await getLastAnalyzedDate();
  console.log(`last analyzed date: ${lastAnalyzedDate}`);

  console.log('getting matches');
  const matches = await getMatchesAfterDate(lastAnalyzedDate);
  console.log('sorting matches');
  const sortedMatches = matches.sort(compareMatches);
  console.log(`matches count: ${sortedMatches.length}`);

  if (sortedMatches.length === 0) {
    console.log('No matches for analysis');
    return;
  }

  console.log('getting current rating');
  const enrichedrating = await getEnrichedRating();
  const rating = enrichedrating.map(({ team_id }) => team_id);
  const teams = enrichedrating.reduce((acc, team) => {
    acc[team.team_id] = {
      name: team.name,
      last_match_time: team.last_match_time,
    };
    return acc;
  }, {});

  const top1Matches = [];
  const top1Teams = [];

  let currentDay = new Date(sortedMatches[0].end_time).getDay();
  let inactiveMatchId = 0;

  for (const match of sortedMatches) {
    const matchDay = new Date(match.end_time).getDay();
    if (currentDay !== matchDay) {
      currentDay = matchDay;
      const sixMonthsAgo = new Date(match.end_time);
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      for (let i = 0; i < rating.length; i += 1) {
        const team_id = rating[i];
        const lastMatchEndTime = new Date(teams[team_id].last_match_time);
        if (lastMatchEndTime < sixMonthsAgo) {
          if (i === 0) {
            const matchEndTime = new Date(match.end_time);
            matchEndTime.setHours(0, 0, 0, 0);
            matchEndTime.set;
            inactiveMatchId -= 1;
            await addMatch({
              match_id: inactiveMatchId,
              end_time: matchEndTime,
              winner_team_id: rating[1],
              winner_name: teams[rating[1]].name,
              looser_team_id: rating[0],
              looser_name: teams[rating[0]].name,
              league_id: 0,
              league_name: `${teams[rating[0]].name} was inactive`,
              new_top_1: true,
            });
          }
          rating.splice(i, 1);
        }
      }
    }

    const winner = {
      team_id: exceptions[match.winner_team_id] || match.winner_team_id,
      name: match.winner_name,
      last_match_time: match.end_time,
    };
    const looser = {
      team_id: exceptions[match.looser_team_id] || match.looser_team_id,
      name: match.looser_name,
      last_match_time: match.end_time,
    };

    teams[winner.team_id] = {
      name: winner.name,
      last_match_time: winner.last_match_time,
      updated: true,
    };
    teams[looser.team_id] = {
      name: looser.name,
      last_match_time: looser.last_match_time,
      updated: true,
    };

    if (!rating.includes(winner.team_id)) {
      rating.push(winner.team_id);
    }
    if (!rating.includes(looser.team_id)) {
      rating.push(looser.team_id);
    }

    const winnerRatingPlace = rating.indexOf(winner.team_id);
    const looserRatingPlace = rating.indexOf(looser.team_id);

    if (winnerRatingPlace > looserRatingPlace) {
      rating.splice(winnerRatingPlace, 1);
      rating.splice(looserRatingPlace, 0, winner.team_id);
    }

    if (looserRatingPlace === 0) {
      top1Matches.push(match.match_id);
      top1Teams.push(winner.team_id);
    }

    console.log(`${match.end_time}: ${winner.name} > ${looser.name}`);
  }

  console.log('updating rating');
  await updateRating(rating);

  console.log('updating teams');
  const uniqueTeams = [...new Set([...rating, ...top1Teams])];
  const teamsToUpdate = uniqueTeams
    .filter((team_id) => teams[team_id].updated)
    .map((team_id) => {
      return {
        team_id: team_id,
        name: teams[team_id].name,
        last_match_time: teams[team_id].last_match_time,
      };
    });
  const teamsToUpdateCount = teamsToUpdate.length;
  console.log(`updating teams. count = ${teamsToUpdateCount}`);
  await updateTeams(teamsToUpdate);

  const top1MatchesCount = top1Matches.length;
  console.log(`updating top 1 matches. count = ${top1MatchesCount}`);
  await setNewTop1Bulk(top1Matches);

  console.log('updating last analyzed date');
  const newLastAnalyzedDate = sortedMatches[sortedMatches.length - 1].end_time;
  await updateLastAnalyzedDate(newLastAnalyzedDate);
  console.log(`new last analyzed date: ${newLastAnalyzedDate}`);
};

export default analyzeMatches;
