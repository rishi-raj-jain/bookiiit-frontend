import redis, { errorResponseError, invalidMethodError, noCaseBody, okResponseBody, verifyUserAsAdmin } from '@/lib/redis'

const faqs = async (req, res) => {
  try {
    const userEmail = res.userData.username
    // Get all the faqs
    if (req.method === 'GET') {
      let FAQs = await redis.hvals('faqs')
      FAQs.forEach((i, ind) => {
        if (i) FAQs[ind] = JSON.parse(i)
      })
      res.status(200).json({ FAQs })
    }
    // Add FAQ
    else if (req.method === 'POST') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { question: q, answer: a } = req.body
        if (!q || q.length < 1) {
          res.status(400).json({ code: 0, message: '[Question] Incorrect format.' })
          return
        }
        if (!a || a.length < 1) {
          res.status(400).json({ code: 0, message: '[Answer] Incorrect format.' })
          return
        }
        const faqObj = {
          q,
          a,
          createdAt: Date.now(),
        }
        await redis.hset('faqs', faqObj['createdAt'], JSON.stringify(faqObj))
        res.status(200).json(okResponseBody)
        return
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    }
    // Delete FAQs
    else if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { createdAt } = req.body
        // Delete one FAQ
        if (createdAt) {
          await redis.hdel('faqs', createdAt)
          res.status(200).json(okResponseBody)
        }
        // Delete all FAQs
        else {
          await redis.del('faqs')
          res.status(200).json(okResponseBody)
        }
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    } else {
      console.log(e)
      res.status(400).json(invalidMethodError)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(errorResponseError)
  }
}

export default faqs
