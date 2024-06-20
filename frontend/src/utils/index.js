const dataFormate = (dateString) => {
  const date = new Date(dateString);
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

module.exports = {
  dataFormate,
};
