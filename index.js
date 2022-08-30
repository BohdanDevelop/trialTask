const { sortTypes } = require("./functions");
const { sortDate } = require("./functions");
const { validateCreditCard } = require("./functions");
const clients = [
  {
    name: "Max",
    type: "vip",
    date: "18.04.2013",
  },
  {
    name: "Denis",
    type: "gold",
    date: "07.10.1999",
  },
  {
    name: "Nikita",
    type: "usual",
    date: "04.09.2001",
  },
  {
    name: "Ivan",
    type: "vip",
    date: "08.01.2000",
  },
  {
    name: "Ann",
    type: "gold",
    date: "28.11.1988",
  },
  {
    name: "Bohdan",
    type: "usual",
    date: "20.10.1993",
  },
  {
    name: "bohdan",
  },
  5,
  "addasdas",
  {
    name: "Bohdan",
    type: "usual",
    date: "20.10.1993",
  },
  {
    name: "Andryi",
    type: "usufal",
    date: "20.10.1993",
  },
];

function getSortArray(givenArray) {
  const cleanArray = givenArray.filter(({ type, date }) => type && date);
  const usualArray = [
    ...cleanArray.filter(({ type }) => type === "usual"),
  ].sort(sortDate);
  const goldArray = [...cleanArray.filter(({ type }) => type === "gold")].sort(
    sortDate
  );
  const vipArray = [...cleanArray.filter(({ type }) => type === "vip")].sort(
    sortDate
  );
  const sortedByTypeArray = [...cleanArray].sort(sortTypes);
  const finalArray = [...usualArray, ...goldArray, ...vipArray].map(
    ({ type, date }) => {
      return { type, date };
    }
  );
  return finalArray;
}

console.log(getSortArray(clients));

const paymentObj = {
  card_sender: "5375411408272594",
  card_recipient: "5375411408272894",
  sum: 433,
  currency: "UAH",
};
function checkPayment(userData) {
  const currency = ["UAH", "USD", "EUR"];
  const checkInfo = {
    result: "error",
    description: "some error",
  };
  if (!validateCreditCard(userData.card_sender)) {
    checkInfo.description = "Sender card is not correct";
    return checkInfo;
  }
  if (!validateCreditCard(userData.card_recipient)) {
    checkInfo.description = "Recipient card is not correct";
    return checkInfo;
  }
  if (userData.sum <= 0) {
    checkInfo.description = "The sum is less than zero";
    return checkInfo;
  }
  if (userData.card_sender === userData.card_recipient) {
    checkInfo.description =
      "The sender and the recipient cannot be the same person";
    return checkInfo;
  }
  if (!currency.some((elem) => elem === userData.currency)) {
    checkInfo.description = "The currency is not correct";
    return checkInfo;
  }
  return { result: "ok", description: "ok" };
}

function getTimeToParticularDate(particularDate) {
  const dayMiliseconds = 86400000;
  const hoursMiliseconds = 3600000;
  const minutesMiliseconds = 60000;
  const currentTime = new Date();
  const timeDifference = particularDate.getTime() - currentTime.getTime();

  const timeLeftToDate = Math.abs(timeDifference);

  const daysLeft = Math.floor(timeLeftToDate / dayMiliseconds)
    .toString()
    .padStart(2, 0);
  const hoursLeft = Math.floor(
    (timeLeftToDate - daysLeft * dayMiliseconds) / hoursMiliseconds
  );

  const minutesLeft = Math.floor(
    (timeLeftToDate -
      daysLeft * dayMiliseconds -
      hoursLeft * hoursMiliseconds) /
      minutesMiliseconds
  )
    .toString()
    .padStart(2, 0);
  const secondsLeft = Math.floor(
    (timeLeftToDate -
      daysLeft * dayMiliseconds -
      hoursLeft * hoursMiliseconds -
      minutesLeft * minutesMiliseconds) /
      1000
  )
    .toString()
    .padStart(2, 0);
  if (daysLeft < 1) return `${hoursLeft}:${minutesLeft}:${secondsLeft}`;
  return `${daysLeft
    .toString()
    .padStart(2, 0)}:${hoursLeft}:${minutesLeft}:${secondsLeft}`;
}

console.log(getTimeToParticularDate(new Date("2022/09/1")));
