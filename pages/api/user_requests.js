import redis, { errorResponseError, invalidMethodError } from '@/lib/redis'

const userRequests = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const userEmail = res.userData.username
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // If valid user, return all the user requests,
      // filter them client side based on ifEvent flag as event
      res.status(200).json({ requests: JSON.parse(await redis.hget(userEmail, 'requests')) })
      return
    } else {
      res.status(400).json(invalidMethodError)
      return
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(errorResponseError)
    return
  }
}

export default userRequests
