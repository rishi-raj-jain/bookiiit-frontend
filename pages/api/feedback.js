import redis, { errorResponseError, invalidMethodError, noCaseBody, okResponseBody, verifyUserAsAdmin } from '@/lib/redis'

const feedback = async (req, res) => {
  try {
    const userEmail = res.userData.username
    // Read feedback item
    if (req.method === 'GET') {
      const { ifHash, userEmail: requestedUserEmail, page = 0 } = req.query
      let feedbacksHashes = []
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // Return the feedbacksHashes
      if (ifHash) {
        feedbacksHashes = await redis.hvals('feedbacksHashes')
        res.status(200).json({ feedbacksHashes })
        return
      }
      // Return the feedback items
      else {
        let feedbacks = []
        // Check if a user requested this first
        if (requestedUserEmail && requestedUserEmail.length > 1 && requestedUserEmail === userEmail) {
          // Fetch all the feedbacks from the given id and dump
          feedbacks = JSON.parse(await redis.hget(userEmail, 'feedbacks'))
          res.status(200).json({ feedbacks })
          return
        }
        // Fallback check to the user being admin itself
        else if (await verifyUserAsAdmin(userEmail)) {
          // Get all the hashes
          feedbacksHashes = await redis.hvals('feedbacksHashes')
          // Sort in descending order
          feedbacksHashes.sort((a, b) => new Number(b) - new Number(a))
          // Paginate the feedbacks
          let parsedPage = parseInt(page)
          let filteredFeedbackHashes = feedbacksHashes.filter((i, index) => index >= parsedPage * 5 && index < (parsedPage + 1) * 5)
          // Convert into JSON
          for (let i in filteredFeedbackHashes) {
            let temp = filteredFeedbackHashes[i]
            if (temp) {
              feedbacks.push(JSON.parse(await redis.hget('feedbacks', temp)))
            }
          }
          res.status(200).json({ feedbacks })
          return
        }
        // No valid user case is present, send nothing
        else {
          res.status(400).json(noCaseBody)
          return
        }
      }
    }
    // Create feedback item
    else if (req.method === 'POST') {
      const { context, feedback, department } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // If invalid context
      if (!context || context.length < 1) {
        res.status(400).json({ code: 0, message: '[Context Name] Incorrect format.' })
        return
      }
      // If invalid feedback
      if (!feedback || feedback.length < 1) {
        res.status(400).json({ code: 0, message: '[Feedback] Incorrect format.' })
        return
      }
      // If invalid department
      if (!department || department.length < 1) {
        res.status(400).json({ code: 0, message: '[Department Name] Incorrect format.' })
        return
      }
      // Try to parse the values if possible, add the date identifier for display purposes.
      // Store hashes of the feedback so that can be paginated later
      else {
        const feedbackObj = {
          context,
          feedback,
          department,
          userEmail,
          createdAt: Date.now(),
        }
        // START: Populate the global feedbacks array for easier admin access
        await redis.hset('feedbacks', feedbackObj['createdAt'], JSON.stringify(feedbackObj))
        await redis.hset('feedbacksHashes', feedbackObj['createdAt'], feedbackObj['createdAt'])
        // END: Populate the global feedbacks array for easier admin access
        // START: Populate the user feedbacks for easier user access
        let temp = []
        let existingFeedbacks = JSON.parse(await redis.hget(userEmail, 'feedbacks'))
        if (existingFeedbacks) {
          temp = [...existingFeedbacks, JSON.stringify(feedbackObj)]
        }
        await redis.hset(userEmail, 'feedbacks', JSON.stringify(temp))
        // END: Populate the user feedbacks for easier access
        res.status(200).json(okResponseBody)
        return
      }
    }
    // Delete feedback item
    else if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // Allow delete if only admin
      if (await verifyUserAsAdmin(userEmail)) {
        const { createdAt } = req.body
        // Delete a particular feedback
        if (createdAt) {
          await redis.hdel('feedbacks', createdAt)
          await redis.hdel('feedbacksHashes', createdAt)
          res.status(200).json(okResponseBody)
          return
        }
        // Delete all feedbacks
        else {
          await redis.del('feedbacks')
          await redis.del('feedbacksHashes')
          res.status(200).json(okResponseBody)
          return
        }
      } else {
        res.status(400).json(noCaseBody)
        return
      }
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

export default feedback
