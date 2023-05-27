const getWeekNumber = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const filterItemsThisWeek = (items) => {
  const currentDate = new Date();
  const currentWeekNumber = getWeekNumber(currentDate);
  const currentYear = currentDate.getFullYear();

  return items.filter((item) => {
    const itemDate = new Date(item.appliedAt);
    return (
      getWeekNumber(itemDate) === currentWeekNumber &&
      itemDate.getFullYear() === currentYear
    );
  });
};

const filterItemsLastWeek = (items) => {
  const currentDate = new Date();
  const currentWeekNumber = getWeekNumber(currentDate);
  const previousWeekNumber =
    currentWeekNumber === 1 ? 52 : currentWeekNumber - 1;
  const currentYear = currentDate.getFullYear();
  const previousYear = currentWeekNumber === 1 ? currentYear - 1 : currentYear;

  return items.filter((item) => {
    const itemDate = new Date(item.date);
    const itemWeekNumber = getWeekNumber(itemDate);
    const itemYear = itemDate.getFullYear();

    return itemWeekNumber === previousWeekNumber && itemYear === previousYear;
  });
};

const replaceNullWithFalseInObj = (obj) => {
  for (let key in obj) {
    if (obj[key] === null) {
      obj[key] = false;
    } else if (typeof obj[key] === "object") {
      replaceNullWithFalse(obj[key]);
    }
  }
  return obj;
};

const normalizeCompanyName = (name) => {
  if (/[,\s](inc|llc|ltd|co)\b/i.test(name)) {
    return `${name.charAt(0).toUpperCase()}${name
      .slice(1)
      .replace(/[,\.]/g, "")
      .toLowerCase()
      .replace(/\s+(inc|llc|ltd|co)\b/g, "")}`;
  } else {
    return name;
  }
};

const generateRandomString = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports = {
  filterItemsThisWeek,
  filterItemsLastWeek,
  replaceNullWithFalseInObj,
  normalizeCompanyName,
  generateRandomString,
};
