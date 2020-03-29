const fetch = require('isomorphic-fetch')

const fetchQuery = async (url, query, variables = {}) => {
   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ query, variables }),
      })
      const { data } = await response.json()
      return data
   } catch (error) {
      console.log(error.message)
   }
}

module.exports = fetchQuery
