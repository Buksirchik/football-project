import {
  toggleMenu,
  generateMenuItem,
  generateTableRow,
  setTitleOfLeague,
  generateMatchesRow,
  showTeamInfo,
} from "./common.js";
import {
  getCompetitionStandings,
  getCompetitions,
  getMatches,
  getTeam,
} from "./requests.js";

const menuBtn = document.querySelector(".menu-icon");
const navigation = document.querySelector(".football-list");
const preloader = document.querySelector(".preloader");
const table = document.querySelector(".standings");
const competitionBlock = document.querySelector(".competition");
const aboutClub = document.querySelector(".about-club");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", () => menuBtn.click());

// show сompetition standings
getCompetitionStandings()
  .then((response) => response.json())
  .then((response) => {
    const data = response.standings[0].table;
    const nameOfStanding = response.competition.name;

    data.forEach(generateTableRow);
    setTitleOfLeague(nameOfStanding);

    competitionBlock.style.display = "block";
    preloader.style.display = "none";
  })
  .catch((e) => {
    alert("Server Error. Please, reload page")
    console.log(1, e);
  });

// get leagues to create a menu
getCompetitions()
  .then((response) => response.json())
  .then((response) => {
    let data = response.competitions;
    // delete cups
    data = data.filter((i) => i.id !== 2000 && i.id !== 2001 && i.id !== 2018);

    data.forEach(generateMenuItem);
  })
  .catch((e) => {
    alert("Server Error. Please, reload page")
    console.log(e.message);
  });

navigation.addEventListener("click", navigationHandleClick);

table.addEventListener("click", tableHandleClick);

function navigationHandleClick(e) {
  e.preventDefault();
  const listRow = e.target.closest(".football-list__row");
  if (!listRow) return;

  // show preloader
  competitionBlock.style.display = "none";
  preloader.style.display = "block";

  // close menu
  menuBtn.click();

  const newStandings = getCompetitionStandings(listRow.dataset.idCompetition);

  newStandings
    .then((response) => response.json())
    .then((response) => {
      const nameOfStanding = response.competition.name;
      const data = response.standings[0].table;

      // delete past information
      table.tBodies[0].innerHTML = "";
      aboutClub.innerHTML = "";

      // create table rows
      data.forEach(generateTableRow);
      setTitleOfLeague(nameOfStanding);

      // hide preloader
      competitionBlock.style.display = "block";
      preloader.style.display = "none";
    })
    .catch((e) => {
      alert("Server Error. Please, reload page")
      console.log(e.message);
    });
}

function tableHandleClick(e) {
  e.preventDefault();
  const target = e.target.closest(".football-team");

  if (!target) return;
  const idClub = target.dataset.idClub;

  // show preloader
  competitionBlock.style.display = "none";
  aboutClub.style.display = "none";
  preloader.style.display = "block";

  // add link
  aboutClub.innerHTML = `
  <a class='about-club__link' href='index.html'>
    &larr; Back
  </a>`;

  const backLink = aboutClub.querySelector(".about-club__link");
  backLink.addEventListener("click", linkHandleClick);

  getTeam(idClub)
    .then((response) => response.json())
    .then((response) => {
      showTeamInfo(response);
    })
    .catch((e) => {
      alert("Server Error. Please, reload page")
      console.log(e.message);
    });

  getMatches(idClub)
    .then((response) => response.json())
    .then((response) => {
      const matches = response.matches;
      let scheduleBlock = document.createElement("div");
      scheduleBlock.classList.add("schedule");
      scheduleBlock.innerHTML = `
      <h3 class='schedule__title'>Schedule</h3>`;
      aboutClub.append(scheduleBlock);

      // create matches rows
      matches.forEach(generateMatchesRow);

      // hide preloader
      aboutClub.style.display = "block";
      preloader.style.display = "none";
    })
    .catch((e) => {
      alert("Server Error. Please, reload page")
      console.log(e.message);
    });
}

function linkHandleClick(e) {
  e.preventDefault();
  competitionBlock.style.display = 'block'
  aboutClub.style.display = 'none'
}