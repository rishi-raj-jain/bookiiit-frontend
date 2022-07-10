import redis, { errorResponseError, invalidMethodError } from '@/lib/redis'

const countRequests = async (req, res) => {
  try {
    // const userEmail = res.userData.username
    // Get length of all the requests
    if (req.method === 'GET') {
      res.status(200).json({ code: 1, requests: await redis.hlen('requests') })
      return
    } else {
      res.status(400).json(invalidMethodError)
      return
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(errorResponseError)
  }
}

export default countRequests
