const fetcher = async (url, variables) => {
   const response = await fetch(url, variables)
   const data = await response.json()
   return { ...data }
}

export default fetcher
