const getToday = () => {
   if (new Date().getHours() >= 16) {
      return new Date(Date.now() + 86400000 * 2)
   }
   return new Date(Date.now() + 86400000)
}

export default getToday
