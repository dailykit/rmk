const getDefaultAddress = async userId => {
   const url = `${process.env.DAILYKEY_URI}/api/addresses?user=${userId}&is_default=true`
   const response = await fetch(url)
   const { data } = await response.json()
   return data[0]
}

module.exports = getDefaultAddress
