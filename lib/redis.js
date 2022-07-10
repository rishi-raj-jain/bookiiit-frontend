import Redis from 'ioredis'

const redis = new Redis({
  db: 0,
  port: 6379,
  host: '127.0.0.1',
})

export default redis

export const invalidMethodError = {
  code: 0,
  message: 'Not acceptable method.',
}

export const okResponseBody = {
  code: 1,
}

export const errorResponseError = {
  code: 2,
  message: 'Error response body.',
}

export const noCaseBody = {
  code: 3,
  message: 'No given case passed.',
}

export const verifyUserAsAdmin = async (userEmail) => {
  if (!userEmail || userEmail.length < 1) return false
  return (await redis.hget('auth_lists', userEmail)) === 'admin'
}

export const getStringDate = (dateVal) => {
  var today = new Date(dateVal)
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()
  return `${dd}${mm}${yyyy}`
}
