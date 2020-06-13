const getToday = time => {
   if (new Date().getHours() >= time) {
      return new Date(Date.now() + 86400000 * 2)
   }
   return new Date(Date.now() + 86400000)
}

module.exports = getToday
