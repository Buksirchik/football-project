const overlay = document.querySelector('.overlay');
const footballList = document.querySelector('.football-list');
const table = document.querySelector('.standings');
const aboutClub = document.querySelector('.about-club');

export const toggleMenu = (e) => {
  overlay.classList.toggle('active');
  footballList.classList.toggle('open');
  e.target.classList.toggle('open');
};

export const generateTableRow = (item) => {
  const tableRow = document.createElement('tr');
  const teamForm = item.form.split(',');

  tableRow.classList.add('standings__row');

  tableRow.innerHTML = `
  <td class='standings__cell'>${item.position}</td>
    <td class='standings__cell'>
      <a class='football-team' href='' data-id-club=${item.team.id}>
        <img
          src='${item.team.crestUrl}'
          alt='${item.team.name}'
          class='football-team__logo'
        />
        <p class='football-team__name'>${item.team.name}</p>
      </a>
    </td>
    <td class='standings__cell'>${item.playedGames}</td>
    <td class='standings__cell'>${item.points}</td>
    <td class='standings__cell'>${item.won}</td>
    <td class='standings__cell'>${item.draw}</td>
    <td class='standings__cell'>${item.lost}</td>
    <td class='standings__cell'>${item.goalsFor}</td>
    <td class='standings__cell'>${item.goalsAgainst}</td>
    <td class='standings__cell'>${item.goalDifference}</td>
    <td class='standings__cell'>
      <ul class='team-form-list'>
        <li class='team-form-list__item ${teamForm[4]}'>${teamForm[4]}</li>
        <li class='team-form-list__item ${teamForm[3]}'>${teamForm[3]}</li>
        <li class='team-form-list__item ${teamForm[2]}'>${teamForm[2]}</li>
        <li class='team-form-list__item ${teamForm[1]}'>${teamForm[1]}</li>
        <li class='team-form-list__item ${teamForm[0]}'>${teamForm[0]}</li>
      </ul>
  </td>`;

  table.tBodies[0].append(tableRow);
};

export const generateMenuItem = (item) => {
  const listRow = document.createElement('li');

  listRow.classList.add('football-list__row');
  listRow.dataset.idCompetition = item.id;
  listRow.innerHTML = `
  <a href='' class='football-item'>
    <div class='football-item__wrap-img'>
    <img src='./image/league-logo/${item.code}.png' alt='${item.name}' class='football-item__img'>
    </div>
    <p class='football-item__name'>${item.name}</p>
  </a>`;

  footballList.append(listRow);
};

export const generateMatchesRow = (item) => {
  const {
    awayTeam,
    homeTeam,
    score: { fullTime },
  } = item;
  const goalsAwayTeam = fullTime.awayTeam !== null ? fullTime.awayTeam : '-';
  const goalsHomeTeam = fullTime.homeTeam !== null ? fullTime.homeTeam : '-';
  const date = transformationDate(item.utcDate);
  const scheduleBlock = document.querySelector('.schedule');

  scheduleBlock.innerHTML += `
  <div class='match'>
    <div class='team-home'>
      <img
        src='https://crests.football-data.org/${homeTeam.id}.svg'
        alt='${homeTeam.name}'
        class='team-home__logo'
      />
      <p class='team-home__name'>${homeTeam.name}</p>
    </div>
    <div class='scoreboard'>
      <p class='scoreboard__score'>${goalsHomeTeam}:${goalsAwayTeam}</p>
      <p class='scoreboard__match-date'>${date}</p>
    </div>
    <div class='team-away'>
      <p class='team-away__name'>${awayTeam.name}</p>
      <img
        src='https://crests.football-data.org/${awayTeam.id}.svg'
        alt='${awayTeam.name}'
        class='team-away__logo'
      />
    </div>
  </div>`;
};

export const setTitleOfLeague = (name) => {
  const title = document.querySelector('.title');
  title.innerHTML = name;
};

export const showTeamInfo = (data) => {
  const {
    venue,
    name,
    shortName,
    id,
    area: { name: located },
  } = data;
  let clubBlock = document.createElement('div');
  clubBlock.classList.add('club');
  
  clubBlock.innerHTML = `
    <div class='club-img-wrap'>
      <img class='club__img' src='https://crests.football-data.org/${id}.svg' alt='${shortName}'>
    </div>
    <div class='club__info'>
      <h3 class='club__name'>${name}</h3>
      <p class='club__info-text'>Located: ${located}</p>
      <p class='club__info-text'>Staduim: ${venue}</p>
    </div>`;

  aboutClub.append(clubBlock)
};

function transformationDate(date) {
  const dateFormat = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const newDateFormat = dateFormat.format(new Date(date));

  return newDateFormat;
}