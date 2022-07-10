import redis, { errorResponseError, invalidMethodError, noCaseBody, okResponseBody, verifyUserAsAdmin } from '@/lib/redis'

const contexts = async (req, res) => {
  try {
    const userEmail = res.userData.username
    // Get all the contexts
    if (req.method === 'GET') {
      let Contexts = []
      let contexts = await redis.hvals('contexts')
      contexts.forEach((i) => {
        if (i) Contexts.push(JSON.parse(i))
      })
      res.status(200).json({ Contexts })
    }
    // Create context
    else if (req.method === 'POST') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { name } = req.body
        if (!name || name.length < 1) {
          res.status(400).json({ code: 0, message: '[Context Name] Incorrect format.' })
          return
        } else {
          const contextObj = {
            name,
            createdAt: Date.now(),
          }
          await redis.hset('contexts', contextObj['createdAt'], JSON.stringify(contextObj))
          res.status(200).json(okResponseBody)
          return
        }
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    }
    // Delete Contexts
    else if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { createdAt } = req.body
        // Delete one Context
        if (createdAt) {
          await redis.hdel('contexts', createdAt)
          res.status(200).json(okResponseBody)
        }
        // Delete all FAQs
        else {
          await redis.del('contexts')
          res.status(200).json(okResponseBody)
        }
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    } else {
      res.status(400).json(invalidMethodError)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(errorResponseError)
  }
}

export default contexts
