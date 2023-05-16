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

module.exports = { filterItemsThisWeek, filterItemsLastWeek };
