const getDate = (days = 0, timestamp = Date.now()) => {
   const dateOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
   }
   const dateTomorrow = new Date(timestamp + 86400000 * days)
   return new Intl.DateTimeFormat('en-US', dateOptions).format(dateTomorrow)
}

module.exports = getDate
