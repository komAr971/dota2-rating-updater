import { jest } from '@jest/globals';
import analyzeMatch from '../src/analyzeMatch';

test('Add new teams radiand win', () => {
  const teams = [];
  const match = {
    match_id: 7685738422,
    start_time: 1713096904,
    radiant_team_id: 1,
    radiant_name: 'team_1',
    dire_team_id: 2,
    dire_name: 'team_2',
    radiant_win: true,
  };

  const teamsToUpdate = analyzeMatch(match, teams);
  console.log(teamsToUpdate);

  expect(teamsToUpdate).toEqual([
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 1,
      last_match_time: 1713096904000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 2,
      last_match_time: 1713096904000,
    },
  ]);
});

test('Add new teams dire win', () => {
  const teams = [];
  const match = {
    match_id: 7685738422,
    start_time: 1713096904,
    radiant_team_id: 1,
    radiant_name: 'team_1',
    dire_team_id: 2,
    dire_name: 'team_2',
    radiant_win: false,
  };

  const teamsToUpdate = analyzeMatch(match, teams);
  console.log(teamsToUpdate);

  expect(teamsToUpdate).toEqual([
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 1,
      last_match_time: 1713096904000,
    },
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 2,
      last_match_time: 1713096904000,
    },
  ]);
});

test('Update existing teams radiant win', () => {
  const teams = [
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 2,
      last_match_time: 1713096903000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 1,
      last_match_time: 1713096903000,
    },
  ];
  const match = {
    match_id: 7685738423,
    start_time: 1713096904,
    radiant_team_id: 1,
    radiant_name: 'team_1',
    dire_team_id: 2,
    dire_name: 'team_2',
    radiant_win: true,
  };

  const teamsToUpdate = analyzeMatch(match, teams);
  console.log(teamsToUpdate);

  expect(teamsToUpdate).toEqual([
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 1,
      last_match_time: 1713096904000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 2,
      last_match_time: 1713096904000,
    },
  ]);
});

test('Update existing teams dire win', () => {
  const teams = [
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 1,
      last_match_time: 1713096903000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 2,
      last_match_time: 1713096903000,
    },
  ];
  const match = {
    match_id: 7685738423,
    start_time: 1713096904,
    radiant_team_id: 1,
    radiant_name: 'team_1',
    dire_team_id: 2,
    dire_name: 'team_2',
    radiant_win: false,
  };

  const teamsToUpdate = analyzeMatch(match, teams);
  console.log(teamsToUpdate);

  expect(teamsToUpdate).toEqual([
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 1,
      last_match_time: 1713096904000,
    },
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 2,
      last_match_time: 1713096904000,
    },
  ]);
});

test('Rating remains the same', () => {
  const teams = [
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 1,
      last_match_time: 1713096903000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 2,
      last_match_time: 1713096903000,
    },
  ];
  const match = {
    match_id: 7685738423,
    start_time: 1713096904,
    radiant_team_id: 1,
    radiant_name: 'team_1',
    dire_team_id: 2,
    dire_name: 'team_2',
    radiant_win: true,
  };

  const teamsToUpdate = analyzeMatch(match, teams);
  console.log(teamsToUpdate);

  expect(teamsToUpdate).toEqual([]);
});

test('Lower ranked team wins and other teams fall in ranking', () => {
  const teams = [
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 3,
      last_match_time: 1713096903000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 1,
      last_match_time: 1713096903000,
    },
    {
      team_id: 3,
      name: 'team_3',
      rating_place: 2,
      last_match_time: 1713096903000,
    },
  ];
  const match = {
    match_id: 7685738423,
    start_time: 1713096904,
    radiant_team_id: 1,
    radiant_name: 'team_1',
    dire_team_id: 2,
    dire_name: 'team_2',
    radiant_win: true,
  };

  const teamsToUpdate = analyzeMatch(match, teams);
  console.log(teamsToUpdate);

  expect(teamsToUpdate).toEqual([
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 1,
      last_match_time: 1713096904000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 2,
      last_match_time: 1713096904000,
    },
    {
      team_id: 3,
      name: 'team_3',
      rating_place: 3,
      last_match_time: 1713096903000,
    },
  ]);
});

test('Higher ranked team wins and no teams fall in ranking', () => {
  const teams = [
    {
      team_id: 1,
      name: 'team_1',
      rating_place: 1,
      last_match_time: 1713096903000,
    },
    {
      team_id: 2,
      name: 'team_2',
      rating_place: 2,
      last_match_time: 1713096903000,
    },
    {
      team_id: 3,
      name: 'team_3',
      rating_place: 3,
      last_match_time: 1713096903000,
    },
  ];
  const match = {
    match_id: 7685738423,
    start_time: 1713096904,
    radiant_team_id: 1,
    radiant_name: 'team_1',
    dire_team_id: 2,
    dire_name: 'team_2',
    radiant_win: true,
  };

  const teamsToUpdate = analyzeMatch(match, teams);
  console.log(teamsToUpdate);

  expect(teamsToUpdate).toEqual([]);
});
