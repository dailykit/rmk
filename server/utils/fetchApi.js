const fetch = require('isomorphic-fetch')

const fetchApi = async (url, body) => {
   const response = await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
   })
   return response
}

module.exports = fetchApi
