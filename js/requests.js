const apiKey = '0de2b419cd614b6da622b89303e0c8ad';

export const getCompetitions = () => {
  try {
    const competitions = fetch(
      'https://api.football-data.org/v2/competitions?plan=TIER_ONE',
      { headers: { 'X-Auth-Token': apiKey } }
    );

    return competitions;
  } catch (e) {
    console.log(e.message);
  }
};

export const getCompetitionStandings = (id = 2021) => {
  // 2021 - it's id of Premier League
  try {
    const standings = fetch(
      `https://api.football-data.org/v2/competitions/${id}/standings?standingType=TOTAL`,
      { headers: { 'X-Auth-Token': apiKey } }
    );

    return standings;
  } catch (e) {
    console.log(e.message);
  }
};

export const getMatches = (id) => {
  try {
    const matches = fetch(
      `https://api.football-data.org/v2/teams/${id}/matches/`,
      { headers: { 'X-Auth-Token': apiKey } }
    );

    return matches;
  } catch (e) {
    console.log(e.message);
  }
};

export const getTeam = (id) => {
  try {
    const team = fetch(`https://api.football-data.org/v2/teams/${id}`, {
      headers: { 'X-Auth-Token': apiKey },
    });

    return team;
  } catch (e) {
    console.log(e.message);
  }
};