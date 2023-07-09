module.exports = {
    formatDate: function (date) {
      const formattedDate = date.toISOString().substring(0, 10);
      return formattedDate;
    },
  };