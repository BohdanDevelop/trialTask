const sortTypes = (a, b) => {
  if (a.type === "usual" && b.type === "gold") return -1;
  if (a.type === "usual" && b.type === "vip") return -1;

  if (a.type === "gold" && b.type === "vip") return -1;
  if (a.type === "gold" && b.type === "usual") return 1;

  if (a.type === "vip" && b.type === "gold") return 1;
  if (a.type === "vip" && b.type === "usual") return 1;

  if (a.type === b.type) return 0;
};
const sortDate = (a, b) => {
  const aTime = new Date(convertDate(a.date));
  const bTime = new Date(convertDate(b.date));

  return aTime - bTime;
};
const convertDate = (givenDate) => {
  const [day, month, year] = givenDate.split(".");
  return `${year}/${month}/${day}`;
};

const validateCreditCard = (creditCard) => {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  const amexpRegEx = /^(?:3[47][0-9]{13})$/;
  const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  let isValid = false;

  if (creditCard.match(visaRegEx)) {
    isValid = true;
  } else if (creditCard.match(mastercardRegEx)) {
    isValid = true;
  } else if (creditCard.match(amexpRegEx)) {
    isValid = true;
  } else if (creditCard.match(discovRegEx)) {
    isValid = true;
  }
  return isValid;
};
module.exports = { sortTypes, sortDate, validateCreditCard };
