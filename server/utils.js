function getWeekNumber(d) {
  // Copy date so original is not modified
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

const filterItemsThisWeek = (items) => {
  const currentDate = new Date();
  const [currentYear, currentWeekNumber] = getWeekNumber(currentDate);

  return items.filter((item) => {
    const itemDate = new Date(item.appliedAt);
    const [itemYear, itemWeekNumber] = getWeekNumber(itemDate);

    return itemWeekNumber === currentWeekNumber && itemYear === currentYear;
  });
};

const filterItemsLastWeek = (items) => {
  const currentDate = new Date();
  const [currentYear, currentWeekNumber] = getWeekNumber(currentDate);

  let previousWeekNumber = currentWeekNumber - 1;
  let previousYear = currentYear;

  if (previousWeekNumber === 0) {
    previousWeekNumber = 52;
    previousYear = currentYear - 1;
  }

  return items.filter((item) => {
    const itemDate = new Date(item.appliedAt);
    const [itemYear, itemWeekNumber] = getWeekNumber(itemDate);

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
